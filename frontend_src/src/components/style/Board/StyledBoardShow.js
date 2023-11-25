/* global kakao */
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {Map, MapMarker} from "react-kakao-maps-sdk";

import {
    AType1,
    BoardShowA,
    BoardShowHeaderType,
    BoardShowSectionType, BoardShowSectionType3,
    BoardShowTextBoxText,
    BoardShowTextImage1,
    BoardShowTextType1,
    BoardShowType,
    Body,
    BodyWrapper2,
    HeaderFont,
    TableFontType2, TableFontType3,
    TableImage1, TableImage3,
    TableImage3Click,
    TableImage4,
    Tdtype1,
    Tdtype4
} from "../../user/board/BoardCss";
import ProImage2 from "../../images/MyPageImage.png";
import BoardShowImage3 from "../../images/BoardShowImage3.png";
import BoardShowImage2 from "../../images/BoardShowImage2TextBox.png";
import BoardShowImage1 from "../../images/BoardShowImage1.png";
import {NoticeShowButtonType2, NoticeShowButtonType3} from "../../admin/notice/NoticeDetailCss";

const StyledBoardShow = ({ }) => {
    const {articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoginArticle, setIsLoginArticle] = useState(false); // 사용자 로그인 아이디와 게시글 작성자 아이디 확인
    const [mapCoords, setMapCoords] = useState({ lat: 37.555055534888176, lng: 126.97092591663251  }); // 초기 좌표 상태 정의 (서울여)
    const [isBoxVisible2, setBoxVisibility2] = useState(true);

    const handleButtonClick2 = () => {
        setBoxVisibility2(!isBoxVisible2);
    };

    //  작성일 날짜까지만 보이도록 수정한 함수
    const extractDate = (datetime) => {
        return datetime.split('T')[0];
    };

    useEffect(() => {
        // 게시글 상세 정보를 가져오는 API 엔드포인트로 요청 보내기
        axios.get(`/board/${articleId}`)
            .then((response) => {
                setArticle(response.data);

                // 주소-좌표 변환 객체 생성 및 호출
                const geocoder = new kakao.maps.services.Geocoder();

                geocoder.addressSearch(response.data.address, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        const newCoords = {lat: result[0].y, lng: result[0].x};
                        setMapCoords(newCoords); // 좌표 상태 업데이트
                    }
                });
            })
            .catch((error) => {
                console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
            });

        // 게시글 수정, 삭제 버튼을 게시글 작성자 본인만 이용할 수 있도록 함
        axios.get(`/board/check-login-Article/${articleId}`)
            .then(response => {
                if (response.data === 'loginArticle') {
                    setIsLoginArticle(true);
                } else {
                    setIsLoginArticle(false);
                }
            })
            .catch(error => {
                console.error('인증 상태 확인 중 오류가 발생했습니다:', error);
            });
    }, [articleId]);

    //  게시글 삭제 함수
    const handleDelete = () => {
        Swal.fire({
            title: '게시글을 삭제하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`/board/${articleId}/delete`)
                    .then((response) => {

                        window.location.href = '/board';
                    })
                    .catch((error) => {
                        console.error('게시글 삭제 중 오류가 발생했습니다:', error);
                    });
            }
        });

    };

    // 주문 링크 클릭을 처리하는 함수
    const handleJoinGroupOrder = (event) => {
        event.preventDefault(); //  링크 이동을 막는 함수
        axios.post(`/order/join`, { orderLink: article.orderLink })
            .then(response => {
                // 백엔드가 어떤 종류의 응답 메시지를 보낸다고 가정합니다.
                Swal.fire({
                    title: '참가 성공!',
                    text: response.data.message || '그룹 주문에 참가했습니다!',
                    icon: 'success',
                    confirmButtonText: '확인'
                });
                setTimeout(() =>   window.location.href = article.orderLink, 2000); //  2초 대기 후 해당 링크로 이동
            })
            .catch(error => {
                if (error.response) {
                    // 요청은 이루어졌지만 서버가 2xx 범위를 벗어나는 상태 코드로 응답했습니다.
                    console.error('Error response:', error.response.data);
                    // 에러 메시지를 알림으로 표시합니다.
                    Swal.fire({
                        title: '참가 실패!',
                        text: error.response.data.message || '참가자 수가 최대라 참여할 수 없습니다.',
                        icon: 'error',
                        confirmButtonText: '확인'
                    });
                } else if (error.request) {
                    // 요청은 이루어졌지만 응답을 받지 못했습니다.
                    console.error('Error request:', error.request);
                    Swal.fire({
                        title: '서버 응답 오류',
                        text: '네트워크 상태를 확인해주세요.',
                        icon: 'warning',
                        confirmButtonText: '확인'
                    });
                } else {
                    // 요청을 설정하는 과정에서 오류가 발생했습니다.
                    console.error('Error message:', error.message);
                    Swal.fire({
                        title: '요청 중 오류가 발생했습니다.',
                        icon: 'warning',
                        confirmButtonText: '확인'
                    });
                }
            });
    };

    return (
        <>
            <Body>
                <BodyWrapper2>
                    {article ? (
                        <div>
                            <HeaderFont>게시글</HeaderFont>
                            <BoardShowHeaderType>{article.title}</BoardShowHeaderType>
                            <TableFontType2>
                                <TableImage1 src={ProImage2} alt="프로필 아이콘 이미지"/>
                                <Tdtype1>{article.user.username}</Tdtype1>
                                <BoardShowA href={article.orderLink}><TableImage4 src={BoardShowImage3} alt="링크 아이콘 이미지"/></BoardShowA>
                                <BoardShowTextBoxText isVisible2={isBoxVisible2}>
                                    <BoardShowTextType1>{article.address}</BoardShowTextType1>
                                    <BoardShowTextImage1 src={BoardShowImage2} alt="텍스처 박스 아이콘 이미지"/>
                                </BoardShowTextBoxText>
                                <TableImage3Click src={BoardShowImage1} alt="위치 아이콘 이미지" onClick={handleButtonClick2}/>
                            </TableFontType2>
                            <Tdtype4>{extractDate(article.createdAt)} {new Date(article.createdAt).toLocaleTimeString('en-US', { hour12: false })}</Tdtype4>
                            <BoardShowType>
                                <BoardShowSectionType>
                                    <BoardShowSectionType>{article.content}</BoardShowSectionType>
                                    <TableFontType3 >
                                        <TableImage3 src={BoardShowImage1} alt="위치 아이콘 이미지"/>
                                        <BoardShowSectionType>배달 도착 위치 : {article.address}</BoardShowSectionType>
                                    </TableFontType3>

                                    {/* 도착 위치 표시 디자인 수정 해주세요 */}
                                    <Map
                                        center={mapCoords}
                                        style={{ width: "100%", height: "360px" }}
                                    >
                                        <MapMarker position={mapCoords}></MapMarker>
                                    </Map>

                                    <BoardShowSectionType3>
                                        <AType1 href={article.orderLink} onClick={(event) => handleJoinGroupOrder(event)} rel="noopener noreferrer">
                                            주문 참가하기</AType1>
                                    </BoardShowSectionType3>
                                </BoardShowSectionType>

                            </BoardShowType>
                            {/* 제목, 작성자, 작성일, 그룹주문링크, 위치, 내용 순서로 나열 */}
                            {/* 삭제 버튼을 보여줄지 여부를 확인하여 조건부 렌더링 */}
                        </div>
                    ) : (
                        <p>게시글을 불러오는 중입니다...</p>
                    )}
                </BodyWrapper2>
            </Body>

            {isLoginArticle ? (
                <NoticeShowButtonType3>
                    <Link to={`/board`}>
                        <NoticeShowButtonType2 type="button">목록으로</NoticeShowButtonType2>
                    </Link>
                    <Link to={`/`}>
                        <NoticeShowButtonType2 type="button">메인 페이지</NoticeShowButtonType2>
                    </Link>
                    <Link to={`/board/${articleId}/update`}>
                        <NoticeShowButtonType2 type="button">수정하기</NoticeShowButtonType2>
                    </Link>
                    <NoticeShowButtonType2 type="button" onClick={handleDelete}>
                        삭제하기
                    </NoticeShowButtonType2>
                </NoticeShowButtonType3>
            ) : (
                <NoticeShowButtonType3>
                    <Link to={`/board`}>
                        <NoticeShowButtonType2 type="button">목록으로</NoticeShowButtonType2>
                    </Link>
                    <Link to={`/`}>
                        <NoticeShowButtonType2 type="button">메인 페이지</NoticeShowButtonType2>
                    </Link>
                </NoticeShowButtonType3>
            )}
        </>
    );
};

export default StyledBoardShow;
