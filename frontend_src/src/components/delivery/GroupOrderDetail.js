/*
//  src/components/delivery/GroupOrderDetail.js
* 배달지 입력 페이지
* 방장만 입력할 수 있는 페이지이다.
* 모든 사용자가 결제를 성공하면 방장이 배달지 입력 버튼을 눌러 이 페이지로 이동한다.
* 배달지 입력을 성공하면 주문이 된다.
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import storeImage from "../images/storeImage.png";
import {
    HomeBody
} from "../HomeCss";

import {
    StoreDetailBody,
    StoreDetailStore,
    StoreDetailStoreHeader,
    StoreDetailStoreImage1,
    StoreDetailStoreTitle, StoreDetailStoreTitle2
} from "./StoreDetailCss";
import {
    GroupOrderBar4,
    GroupOrderBarHeader3,
    GroupOrderDetailBox1, GroupOrderDetailButton1, GroupOrderDetailButton2,
    GroupOrderDetailHostBox, GroupOrderDetailHostBox1_1,
    GroupOrderDetailHostBox2, GroupOrderDetailHostBox3, GroupOrderDetailHostBox3_1,
    GroupOrderDetailInput, GroupOrderDetailInput2, GroupOrderDetailInput3,
    GroupOrderDetailText1,
    GroupOrderDetailText2,
    GroupOrderDetailText2_1,
    GroupOrderDetailText3,
    GroupOrderDetailText4,
    GroupOrderDetailText5,
    GroupOrderDetailText6,
    GroupOrderDetailText7, GroupOrderDetailText8,
    GroupOrderDetailTitle,
    GroupOrderDetailTitle2, GroupOrderPageMenuImage1
} from "./GroupOrderPageCss"
import StyledLoginAfter from "../style/Header/StyledLoginAfter";
import StyledHeaderHome from "../style/Header/StyledHeaderHome";
import StyledHeaderAfter from "../style/Header/StyledHeaderAfter";
import StyledMainPage from "../style/StyledMainPage";
import StyledArrow from "../style/StyledArrow";
import StyledFooter from "../style/StyledFooter";

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GroupOrderDetail() {
    /* 주문 내역 */
    const [groupedOrders, setGroupedOrders] = useState({});
    const { groupOrderId } = useParams();
    const [storeInfo, setStoreInfo] = useState({ name: "", deliveryTip: 0 , simage: ""}); // 가게 정보 상태 변수
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);  //  주문 목록 전체 금액 상태 변수

    /* 호스트정보(이름 + 연락처) + 배달지 + 요청사항 */
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [specialInstructions, setSpecialInstructions] = useState("");

    const [menus] = useState([]);
    // 가게 정보를 불러오는 함수
    const fetchStoreInfo = async () => {
        try {
            const response = await axios.get(`/order/store-info/${groupOrderId}`);
            setStoreInfo({
                name: response.data.name,
                deliveryTip: response.data.deliveryTip,
                simage: response.data.simage
            });
        } catch (error) {
            console.error('가게 정보를 불러오는 중 오류가 발생했습니다:', error);
        }
    };

    //  배달지 + 요청사항 추가 처리하는 함수
    const handleSubmit = () => {
        axios.post(`/order/${groupOrderId}/update`, { deliveryAddress, detailAddress, specialInstructions })
            .then((response) => {
                // 추가 성공 시 주문 완료 메시지를 화면에 띄어주고 싶어
                Swal.fire({
                    title: '주문 완료',
                    icon: 'success',
                    confirmButtonText: '닫기'
                });
                window.location.href = '/';
                console.log('주문이 완료되었습니다.');
            })
            .catch((error) => {
                Swal.fire({
                    title: '주문 실패',
                    text: '다시 입력하세요!',
                    icon: 'error',
                    confirmButtonText: '닫기'
                });
                console.error('배달지 입력에 실패하였습니다. : ', error);
            });
    };

    //  주소 API
    const openAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 선택한 주소를 가져와서 입력 필드를 업데이트
                setDeliveryAddress(data.address);
            },
        }).open();
    };

    //  groupOrderId에서 userId 별로 그룹화하여 주문 내역 보여주는 함수
    const groupOrdersByUserId = (orders, deliveryTip) => {
        const grouped = orders.reduce((acc, order) => {
            const orderTotal = order.mmoney * order.quantity;
            if (!acc[order.userId]) {
                acc[order.userId] = {
                    username: order.username,
                    orders: [order],
                    totalAmount: orderTotal
                };
            } else {
                acc[order.userId].orders.push(order);
                acc[order.userId].totalAmount += orderTotal;
            }
            return acc;
        }, {});

        // 사용자별로 나눈 배달팁 계산
        const userCount = Object.keys(grouped).length;
        const tipPerUser = deliveryTip / userCount;

        // 각 사용자의 총액에 배달팁을 더함
        Object.values(grouped).forEach(group => {
            group.totalAmount += tipPerUser;
        });

        return grouped;
    };

    // 주문 데이터를 groupOrderId 별로 불러오는 함수
    const fetchOrderItems = async () => {
        try {
            const response = await axios.get(`/order/items/${groupOrderId}`);
            const grouped = groupOrdersByUserId(response.data, storeInfo.deliveryTip);
            setGroupedOrders(grouped);
        } catch (error) {
            console.error('주문 데이터를 불러오는 중 오류가 발생했습니다:', error);
        }
    };

    useEffect(() => {
        // 호스트 이름을 가져와 상태에 저장
        axios
            .get("/get-user-name")
            .then((response) => {
                setUsername(response.data);
            })
            .catch((error) => {
                // 에러 처리
            });

        // 호스트 연락처 가져와 상태에 저장
        axios
            .get("/get-user-phone")
            .then((response) => {
                setPhone(response.data);
            })
            .catch((error) => {
                // 에러 처리
            });

        if (groupOrderId) {
            fetchStoreInfo().then(() => {
                fetchOrderItems();  // 주문 목록 불러오기
            });
        }
    }, [groupOrderId, storeInfo.deliveryTip, fetchOrderItems]);

    // groupedOrders가 변경될 때마다 전체 주문표의 총액 계산
    useEffect(() => {
        const total = Object.values(groupedOrders).reduce((sum, group) => {
            return sum + group.totalAmount;
        }, 0);
        setTotalOrderPrice(total);
    }, [groupedOrders]);

    return (
        <HomeBody>
            <StyledLoginAfter/>
            <StyledHeaderHome/>
            <StyledHeaderAfter/>

            <GroupOrderBar4>
                <StoreDetailBody>
                    <StoreDetailStore>
                        <GroupOrderBarHeader3>
                            <GroupOrderDetailText1>주문 내역</GroupOrderDetailText1>
                        </GroupOrderBarHeader3>
                        {/* 가게 이름, 평점, 리뷰수, 최소 주문 금액, 배달 요금,
                        배달 예상 시간, 영업 시간, 전화번호, 주소 순서로 작성함 */}
                        {menus.length > 0 ? <StoreDetailStoreHeader>{menus[0].store.sname}</StoreDetailStoreHeader> : null}
                        <StoreDetailStoreTitle>
                            <StoreDetailStoreImage1
                                src={storeInfo.simage}
                                alt="가게 썸네일"
                                onError={(e) => {
                                    e.target.onerror = null; // 이후 재시도 방지
                                    e.target.src = storeImage; // 기본 이미지 경로로 교체
                                }}
                            />
                            <StoreDetailStoreTitle2>
                                <GroupOrderDetailText2>{storeInfo.name}</GroupOrderDetailText2>
                                <GroupOrderDetailTitle className="order-list">
                                    {Object.entries(groupedOrders).map(([userId, group]) => (
                                        <div key={userId}>
                                            <GroupOrderDetailText2_1>{group.username}</GroupOrderDetailText2_1>
                                            {group.orders.map((order, index) => (
                                                <div key={index}>
                                                    <GroupOrderPageMenuImage1
                                                        src={order.mimage}
                                                        alt="음식 썸네일"
                                                        onError={(e) => {
                                                            e.target.onerror = null; // 이후 재시도 방지
                                                            e.target.src = storeImage; // 기본 이미지 경로로 교체
                                                        }}
                                                    />
                                                    <GroupOrderDetailText3>
                                                        {order.mname} 수량: {order.quantity}개
                                                        <GroupOrderDetailText5>{formatNumberWithCommas(order.mmoney * order.quantity)}원</GroupOrderDetailText5>
                                                    </GroupOrderDetailText3>
                                                </div>
                                            ))}
                                            <GroupOrderDetailText4>{group.username}님의 주문 총액(배달팁 포함): <GroupOrderDetailText5>{formatNumberWithCommas(group.totalAmount)}원</GroupOrderDetailText5></GroupOrderDetailText4>
                                        </div>
                                    ))}
                                </GroupOrderDetailTitle>
                                <GroupOrderDetailTitle2>
                                    <GroupOrderDetailText6>배달 팁: {formatNumberWithCommas(storeInfo.deliveryTip)}원</GroupOrderDetailText6>
                                    <GroupOrderDetailText7>전체 주문표 총액: {formatNumberWithCommas(totalOrderPrice)}원</GroupOrderDetailText7>
                                </GroupOrderDetailTitle2>
                            </StoreDetailStoreTitle2>
                        </StoreDetailStoreTitle>
                    </StoreDetailStore>
                </StoreDetailBody>
            </GroupOrderBar4>

            <GroupOrderDetailBox1 className="delivery-information">
                <GroupOrderDetailHostBox1_1>주문자 정보</GroupOrderDetailHostBox1_1>
                <GroupOrderDetailHostBox3>
                    <GroupOrderDetailText8>이름</GroupOrderDetailText8>
                    <GroupOrderDetailInput type="text" value={username} readOnly />
                    <GroupOrderDetailText8>번호</GroupOrderDetailText8>
                    <GroupOrderDetailInput type="text" value={phone} readOnly />
                </GroupOrderDetailHostBox3>

                <GroupOrderDetailHostBox>배달지</GroupOrderDetailHostBox>
                <GroupOrderDetailHostBox3>
                    <GroupOrderDetailText8>주소</GroupOrderDetailText8>
                    <GroupOrderDetailHostBox2>
                        <GroupOrderDetailInput2 type="text" value={deliveryAddress} readOnly />
                        <GroupOrderDetailButton1 type="button" onClick={openAddressSearch}>
                            도로명 검색
                        </GroupOrderDetailButton1>
                    </GroupOrderDetailHostBox2>
                    <GroupOrderDetailInput
                        placeholder=" 상세 주소"
                        type="text"
                        value={detailAddress}
                        onChange={(e) => setDetailAddress(e.target.value)}
                    />
                </GroupOrderDetailHostBox3>

                <GroupOrderDetailHostBox>요청 사항</GroupOrderDetailHostBox>
                <GroupOrderDetailHostBox3_1>
                    <GroupOrderDetailInput3
                        placeholder=" 요청 사항을 적어주세요."
                        type="text"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                    />
                </GroupOrderDetailHostBox3_1>
            </GroupOrderDetailBox1>
            <GroupOrderDetailButton2 type="submit" onClick={handleSubmit}> 주문하기 </GroupOrderDetailButton2>

            <StyledMainPage/>
            <StyledArrow/>
            <StyledFooter/>
        </HomeBody>
    );
}

export default GroupOrderDetail;
