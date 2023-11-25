//  src/components/delivery/Store.js

/*
음식점 카테고리 별 페이지
* 한식, 일식, 중식, 야식, 치킨, 피자로 구분해서 음식점 보여줌
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import storeImage from "../images/storeImage.png"
import {
    HomeBody
} from "../HomeCss";

import Icon from "../images/StoreImageIcon.png"

import {
    StoreButtonType1,
    StoreInputType1, StoreInputType2,
    StoreMenuHeader, StoreMenuHeaderType,
    StoreMenuSectionType1,
    StoreMenuSectionType2,
    StoreMenuSectionType3,
    StoreMenuTextTpye2, LinkType1, PType, StoreMenuSectionImage1, StoreMenuSectionType4, PType2,
    StoreMenuSectionType5,StoreMenuSectionType6,StoreMenuImgType2,StoreMenuBar,StoreSection1
} from "./StoreCss";
import {
    BoardMainInputImage1,
    BoardMainInputImageBox1,
} from "../user/board/BoardCss";
import NoticeImage from "../images/NoticeImage.png";
import StyledFooter from "../style/StyledFooter";
import StyledArrow from "../style/StyledArrow";
import StyledMainPage from "../style/StyledMainPage";
import StyledAi from "../style/Header/StyledAi";
import StyledLogInBefore from "../style/Header/StyledLogInBefore";
import StyledHeaderHome from "../style/Header/StyledHeaderHome";
import StyledHeaderBefore from "../style/Header/StyledHeaderBefore";
import StyledLoginAfter from "../style/Header/StyledLoginAfter";
import StyledHeaderAfter from "../style/Header/StyledHeaderAfter";
import StyledMenuBar from "../style/Delivery/StyledMenuBar";

// 숫자를 세 자리마다 콤마로 형식화하는 함수
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Store() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ setUserId] = useState("");
    const [ setUsername] = useState("");

    const { category } = useParams();
    const [stores, setStores] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태


    useEffect(() => {
        // 서버로 현재 사용자의 인증 상태 확인을 위한 요청 보내기
        axios
            .get("/check-auth")
            .then((response) => {
                if (response.data === "authenticated") {
                    setIsAuthenticated(true);

                    // 사용자 ID를 가져와 상태에 저장
                    axios
                        .get("/get-user-id")
                        .then((response) => {
                            setUserId(response.data);
                        })
                        .catch((error) => {
                            // 에러 처리
                        });

                    // 사용자 ID를 가져와 상태에 저장
                    axios
                        .get("/get-user-name")
                        .then((response) => {
                            setUsername(response.data);
                        })
                        .catch((error) => {
                            // 에러 처리
                        });
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch((error) => {
                // 요청 실패 처리
            });
    }, []);


    useEffect(() => {
        axios.get(`/store/category?category=${category}`)
            .then(response => {
                setStores(response.data);
            })
            .catch(error => {
                console.error('가게 목록을 불러오는 중 오류가 발생했습니다:', error);
            });
    }, [category]);

    // 검색 요청 함수
    const handleSearch = () => {
        // 검색어를 사용하여 서버로 검색 요청을 보냄
        axios.get(`/store/category?category=${category}&search=${searchTerm}`)
            .then((response) => {
                setStores(response.data);
            })
            .catch((error) => {
                console.error('가게 검색 중 오류가 발생했습니다:', error);
            });
    };

    return (
        <div>
            {isAuthenticated ? (
                <HomeBody>
                    <StyledLoginAfter/>
                    <StyledHeaderHome/>
                    <StyledHeaderAfter/>
                    <StyledAi/>

                    <StoreSection1>
                        <StoreMenuHeader>
                            <StoreMenuHeaderType>{category} 카테고리 가게 목록</StoreMenuHeaderType>
                            <BoardMainInputImageBox1>
                                <BoardMainInputImage1 onClick={handleSearch} src={NoticeImage} alt="돋보기 이미지"/>
                            </BoardMainInputImageBox1>
                            <StoreInputType1
                                type="text"
                                placeholder="제목을 검색해주세요."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {    //  Enter 눌러도 검색됨
                                        handleSearch();
                                    }
                                }}
                            />
                            <StoreInputType2
                                type="text"
                                placeholder="YYYY. MM.DD"
                            ></StoreInputType2>
                            <StoreButtonType1 onClick={handleSearch}>검색</StoreButtonType1>
                        </StoreMenuHeader>
                        <StoreMenuBar>
                            <StoreMenuSectionType1 className="store-list">
                                {stores.map(store => (
                                    <div key={store.storeId} className="store-item">
                                        <LinkType1 to={`/store/${store.storeId}`}>
                                            <StoreMenuSectionType2>
                                                <StoreMenuSectionImage1
                                                    src={store.simage}
                                                    alt="가게 썸네일"
                                                    onError={(e) => {
                                                        e.target.onerror = null; // 이후 재시도 방지
                                                        e.target.src = storeImage; // 기본 이미지 경로로 교체
                                                    }}
                                                />
                                                <StoreMenuSectionType3>
                                                    <StoreMenuTextTpye2>{store.sname}</StoreMenuTextTpye2>

                                                    <StoreMenuSectionType4>
                                                        <PType>평점 ⭐{store.sgrade}</PType>
                                                        <PType>리뷰 {formatNumberWithCommas(store.sreview)}</PType>
                                                    </StoreMenuSectionType4>
                                                    <StoreMenuSectionType5>
                                                        <PType2>최소 주문 금액: {formatNumberWithCommas(store.sorderMinimum)}원</PType2>
                                                        <PType2>배달 예상 시간: {store.stime}</PType2>
                                                    </StoreMenuSectionType5>
                                                </StoreMenuSectionType3>
                                                <StoreMenuSectionType6><StoreMenuImgType2 src={Icon} alt="아이콘 이미지" /> 주문하기</StoreMenuSectionType6>
                                            </StoreMenuSectionType2>
                                        </LinkType1>
                                    </div>
                                ))}
                            </StoreMenuSectionType1>

                            <StyledMenuBar/>

                        </StoreMenuBar>
                    </StoreSection1>


                    <StyledMainPage/>
                    <StyledArrow/>
                    <StyledFooter/>
                </HomeBody>
            ):(
                <HomeBody>
                    <StyledLogInBefore/>
                    <StyledHeaderHome/>
                    <StyledHeaderBefore/>
                    <StyledAi/>

                    <StoreSection1>
                        <StoreMenuHeader>
                            <StoreMenuHeaderType>{category} 카테고리 가게 목록</StoreMenuHeaderType>
                            <BoardMainInputImageBox1>
                                <BoardMainInputImage1 onClick={handleSearch} src={NoticeImage} alt="돋보기 이미지"/>
                            </BoardMainInputImageBox1>
                            <StoreInputType1
                                type="text"
                                placeholder="제목을 검색해주세요."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {    //  Enter 눌러도 검색됨
                                        handleSearch();
                                    }
                                }}
                            />
                            <StoreInputType2
                                type="text"
                                placeholder="YYYY. MM.DD"
                            ></StoreInputType2>
                            <StoreButtonType1 onClick={handleSearch}>검색</StoreButtonType1>
                        </StoreMenuHeader>
                        <StoreMenuBar>
                            <StoreMenuSectionType1 className="store-list">
                                {stores.map(store => (
                                    <div key={store.storeId} className="store-item">
                                        <LinkType1 to={`/store/${store.storeId}`}>
                                            <StoreMenuSectionType2>
                                                <StoreMenuSectionImage1
                                                    src={store.simage}
                                                    alt="가게 썸네일"
                                                    onError={(e) => {
                                                        e.target.onerror = null; // 이후 재시도 방지
                                                        e.target.src = storeImage; // 기본 이미지 경로로 교체
                                                    }}
                                                />
                                                <StoreMenuSectionType3>
                                                    <StoreMenuTextTpye2>{store.sname}</StoreMenuTextTpye2>

                                                    <StoreMenuSectionType4>
                                                        <PType>평점 ⭐{store.sgrade}</PType>
                                                        <PType>리뷰 {formatNumberWithCommas(store.sreview)}</PType>
                                                    </StoreMenuSectionType4>
                                                    <StoreMenuSectionType5>
                                                        <PType2>최소 주문 금액: {formatNumberWithCommas(store.sorderMinimum)}원</PType2>
                                                        <PType2>배달 예상 시간: {store.stime}</PType2>
                                                    </StoreMenuSectionType5>
                                                </StoreMenuSectionType3>
                                                <StoreMenuSectionType6><StoreMenuImgType2 src={Icon} alt="아이콘 이미지" /> 주문하기</StoreMenuSectionType6>
                                            </StoreMenuSectionType2>
                                        </LinkType1>
                                    </div>
                                ))}
                            </StoreMenuSectionType1>

                            <StyledMenuBar/>

                        </StoreMenuBar>
                    </StoreSection1>

                    <StyledMainPage/>
                    <StyledArrow/>
                    <StyledFooter/>
                </HomeBody>
            )}
        </div>

    );
}

export default Store;
