//  src/components/delivery/StoreDetail.js

/*
음식점 상세 페이지
* 가게 정보
* 메뉴
* 메뉴 클릭하면 모달창 나옴 -> 모달창에서 `주문 담기` 기능 사용 가능
* 음식점 상세 페이지에서 주문 기능 추가할거임 (단, 주문은 로그인한 상태여야 함)
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import storeImage from "../images/storeImage.png";
import {
    HomeBody,
} from "../HomeCss";

import {
    BoardMainButtonType1,
    BoardMainFlexType,
    BoardMainHeader,
    BoardMainInputImage1,
    BoardMainInputImageBox1,
    BoardMainInputType1,
    BoardMainInputType2, BoardMainLink,
    BoardMainTable1,
    BoardMainTbody,
    BoardMainTd,
    BoardMainTh,
    BoardMainThead,
    BoardMainTr, WriteButton2, WriteImage3, Pagination, TableImage4, BoardButton, PageFlex1
} from "../user/board/BoardCss";

import NoticeImage2 from "../images/NoticeImage2.png";
import NoticeImage from "../images/NoticeImage.png";
import {
    ModalFlexType1, ModalFont1, ModalHr,
    StoreDetailBar,
    StoreDetailBarAll,
    StoreDetailBarFlex,
    StoreDetailBarHeader,
    StoreDetailBarHeaderIcon,
    StoreDetailBarHeaderText,
    StoreDetailBarHeaderText2,
    StoreDetailBody,
    StoreDetailBody2,
    StoreDetailButtonType1,
    StoreDetailFooter,
    StoreDetailHeaderIconImage,
    StoreDetailSectionText1,
    StoreDetailSectionText2,
    StoreDetailStore,
    StoreDetailStoreHeader,
    StoreDetailStoreImage1,
    StoreDetailStoreMenu,
    StoreDetailStoreMenuHeader,
    StoreDetailStoreMenuHeaderFont,
    StoreDetailStoreMenuImage1, StoreDetailStoreMenuImage2,
    StoreDetailStoreMenuSection,
    StoreDetailStoreMenuSection2,
    StoreDetailStoreMenuSection3,
    StoreDetailStoreMenuSectionFlex,
    StoreDetailStoreText1,
    StoreDetailStoreText2, StoreDetailStoreText3, StoreDetailStoreText4,
    StoreDetailStoreTitle,
    StoreDetailStoreTitle2, ModalFlexType2, ModalFont2, ModalFlexType3, ModalButton
} from "./StoreDetailCss";
import BoardShowImage3 from "../images/BoardShowImage3.png";
import StyledFooter from "../style/StyledFooter";
import StyledArrow from "../style/StyledArrow";
import StyledMainPage from "../style/StyledMainPage";
import StyledHeaderBefore from "../style/Header/StyledHeaderBefore";
import StyledLoginBefore from "../style/Header/StyledLogInBefore";
import StyledHeaderHome from "../style/Header/StyledHeaderHome";
import StyledLoginAfter from "../style/Header/StyledLoginAfter";
import StyledHeaderAfter from "../style/Header/StyledHeaderAfter";


// 스타일 태그 내의 CSS - 모달창 디자인
const modalStyle = `
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1040;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        .menu-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30%;
            background-color: white;
            padding: 20px;
            z-index: 1050;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        }
        
        .menu-modal h2 {
            margin-top: 0;
            color: #333;
            font-size: 1.5rem;
        }
        
        .menu-modal p {
            color: #666;
            font-size: 1rem;
        }
        
        .menu-modal button {
            margin-top: 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .menu-modal button:hover {
            background-color: #0056b3;
        }
        
        .menu-modal .close-button {
            background-color: #6c757d;
        }
        
        .menu-modal .close-button:hover {
            background-color: #545b62;
        }
        
        @media (max-width: 768px) {
            .menu-modal {
                width: 80%;
                padding: 10px;
            }
        }
        
        @media (max-width: 480px) {
            .menu-modal {
                width: 90%;
                padding: 5px;
            }
        }
    `;

// 숫자를 세 자리마다 콤마로 형식화하는 함수
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function StoreDetail({ match }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 사용자 로그인 상태

    const [menus, setMenus] = useState([]);
    const [showModal, setShowModal] = useState(false); // 모달 상태 변수 추가
    const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴 정보 (모달창으로 보여줌)
    const { storeId } = useParams();
    const [groupOrderUrl, setGroupOrderUrl] = useState(''); // 그룹 주문 URL 상태
    const [articles, setArticles] = useState([]);

    const [search, setSearch] = useState(''); // 검색어 상태 추가

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const postsPerPage = 10; // 페이지당 게시물 수

    const [showMenu, setShowMenu] = useState(true);  // 메뉴 보이기/감추기 상태
    const [showInfo, setShowInfo] = useState(false); // 정보 보이기/감추기 상태


    // 이전 페이지로 이동하는 함수
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 처음 페이지로 이동하는 함수
    const startPage = () => {
        if (currentPage > 1) {
            setCurrentPage(1);
        }
    };

    // 다음 페이지로 이동하는 함수
    const nextPage = () => {
        if (currentPage < Math.ceil(articles.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 끝 페이지로 이동하는 함수
    const endPage = () => {
        if (currentPage < Math.ceil(articles.length / postsPerPage)) {
            setCurrentPage(Math.ceil(articles.length / postsPerPage));
        }
    };


    // 게시물 목록을 현재 페이지에 맞게 가져오는 함수
    const getCurrentPosts = () => {
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        return articles.slice(indexOfFirstPost, indexOfLastPost);
    };

    // 페이지 변경 시 호출되는 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //  작성일 날짜까지만 보이도록 수정한 함수
    const extractDate = (datetime) => {
        return datetime.split('T')[0];
    };

    // 검색 함수
    const handleSearch = () => {
        axios.get('/board', { params: { search } }) // 검색어를 서버로 전달
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error('게시글 검색 중 오류가 발생했습니다:', error);
            });
    };


    //  메뉴 선택하면 모달창 표시하는 함수
    const toggleModal = (menu) => {
        setSelectedMenu(menu);
        setShowModal(!showModal);
    };


    useEffect(() => {
        //  가게 메뉴 불러오기
        axios.get(`/store/${storeId}`)
            .then(response => {
                setMenus(response.data);
            })
            .catch(error => {
                console.error('가게 메뉴를 불러오는 중 오류가 발생했습니다:', error);
            });

        // 서버로 현재 사용자의 인증 상태 확인을 위한 요청 보내기
        axios.get('/check-auth')
            .then(response => {
                if (response.data === 'authenticated') {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(error => {
                console.error('인증 상태 확인 중 오류가 발생했습니다:', error);
            });

        axios.get('/board/orderLink')
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error('게시글 목록을 가져오는 중 오류가 발생했습니다:', error);
            });
    }, [storeId]);

    // 그룹 주문 링크 함수
    const createGroupOrder = () => {
        axios.post('/order/create-group-order/' + storeId)
            .then(response => {
                const groupOrderLink = response.data;
                setGroupOrderUrl(groupOrderLink);

                // 클립보드에 링크 복사
                navigator.clipboard.writeText(groupOrderLink).then(() => {
                    Swal.fire({
                        title: '그룹주문 링크 복사 성공!',
                        text: '클립보드에 복사되었습니다. 공유하세요!',
                        icon: 'success',
                        confirmButtonText: '닫기'
                    });
                });
            })
            .catch(error => {
                Swal.fire({
                    title: '오류!',
                    text: '그룹 주문 링크 생성 중 오류가 발생했습니다',
                    icon: 'error',
                    confirmButtonText: '닫기'
                });
                console.error('그룹 주문 생성 중 오류가 발생했습니다:', error);
            });

    };


    return (
        <><style>{modalStyle}</style>
            {isAuthenticated ? (
                <HomeBody>
                    <StyledLoginAfter/>
                    <StyledHeaderHome/>
                    <StyledHeaderAfter/>

                    <StoreDetailBody2>
                        <StoreDetailBody>
                            <StoreDetailStore>
                                {/* 가게 이름, 평점, 리뷰수, 최소 주문 금액, 배달 요금,
                        배달 예상 시간, 영업 시간, 전화번호, 주소 순서로 작성함 */}
                                {menus.length > 0 ? <StoreDetailStoreHeader>{menus[0].store.sname}</StoreDetailStoreHeader> : null}
                                <StoreDetailStoreTitle>
                                    {menus.length > 0 ?
                                        <StoreDetailStoreImage1
                                            src={menus[0].store.simage}
                                            alt="가게 썸네일"
                                            onError={(e) => {
                                                e.target.onerror = null; // 이후 재시도 방지
                                                e.target.src = storeImage; // 기본 이미지 경로로 교체
                                            }}
                                        /> : null}
                                    <StoreDetailStoreTitle2>
                                        {menus.length > 0 ? <StoreDetailStoreText1>⭐{menus[0].store.sgrade}</StoreDetailStoreText1> : null}
                                        {menus.length > 0 ? <StoreDetailStoreText1><StoreDetailStoreText2> 리뷰 :</StoreDetailStoreText2>{formatNumberWithCommas(menus[0].store.sreview)}</StoreDetailStoreText1> : null}
                                        {menus.length > 0 ? <StoreDetailStoreText1><StoreDetailStoreText2>💰 최소 주문 금액  : </StoreDetailStoreText2>{formatNumberWithCommas(menus[0].store.sorderMinimum)}원</StoreDetailStoreText1> : null}
                                        {menus.length > 0 ? <StoreDetailStoreText1> <StoreDetailStoreText2>💲  배달 요금 : </StoreDetailStoreText2>{formatNumberWithCommas(menus[0].store.stip)}원</StoreDetailStoreText1> : null}
                                        {menus.length > 0 ? <StoreDetailStoreText1> <StoreDetailStoreText2> ⏰ 배달 예상 시간 :  </StoreDetailStoreText2>{menus[0].store.stime}</StoreDetailStoreText1> : null}
                                    </StoreDetailStoreTitle2>

                                </StoreDetailStoreTitle>
                            </StoreDetailStore>

                            <StoreDetailStoreMenu>
                                <StoreDetailStoreMenuHeader>
                                    {/* 메뉴와 정보에 대한 클릭 이벤트 추가 */}
                                    <StoreDetailStoreMenuHeaderFont onClick={() => { setShowMenu(true); setShowInfo(false); }}>메뉴</StoreDetailStoreMenuHeaderFont>
                                    <StoreDetailStoreMenuHeaderFont onClick={() => { setShowMenu(false); setShowInfo(true); }}>정보</StoreDetailStoreMenuHeaderFont>
                                </StoreDetailStoreMenuHeader>

                                {/* 메뉴가 보이는 경우 */}
                                {showMenu && (
                                    <StoreDetailStoreMenuSection className="menu-list">
                                        {menus.map(menu => (
                                            <StoreDetailStoreMenuSectionFlex key={menu.menuId} className="menu-item" onClick={() => toggleModal(menu)}>
                                                <StoreDetailStoreMenuImage1
                                                    src={menu.mimage}
                                                    alt="음식 썸네일"
                                                    onError={(e) => {
                                                        e.target.onerror = null; // 이후 재시도 방지
                                                        e.target.src = storeImage; // 기본 이미지 경로로 교체
                                                    }}
                                                />
                                                {/*  메뉴 이름 - 메뉴 소개 - 가격 순서로 작성함 */}
                                                <StoreDetailStoreMenuSection2>
                                                    <h2>{menu.mname}</h2>
                                                    <p>{menu.mintro}</p>
                                                    <p>{formatNumberWithCommas(menu.mmoney)}원</p>
                                                </StoreDetailStoreMenuSection2>
                                            </StoreDetailStoreMenuSectionFlex>
                                        ))}
                                    </StoreDetailStoreMenuSection>
                                )}

                                {/* 정보가 보이는 경우 */}
                                {showInfo && (
                                    <StoreDetailStoreMenuSection3>
                                        <StoreDetailStoreText3>업체 정보</StoreDetailStoreText3>
                                        {menus.length > 0 ? <StoreDetailStoreText4> <StoreDetailStoreText2>영업 시간 </StoreDetailStoreText2>{menus[0].store.sopen}</StoreDetailStoreText4> : null}
                                        {menus.length > 0 ? <StoreDetailStoreText4> <StoreDetailStoreText2>☎️ 전화번호 </StoreDetailStoreText2>{menus[0].store.sphone}</StoreDetailStoreText4> : null}
                                        {menus.length > 0 ? <StoreDetailStoreText4><StoreDetailStoreText2>🏠 주소 </StoreDetailStoreText2>{menus[0].store.saddress}</StoreDetailStoreText4> : null}
                                    </StoreDetailStoreMenuSection3>
                                )}
                            </StoreDetailStoreMenu>

                            {/* 모달 내용 추가 */}
                            {showModal && selectedMenu && (
                                <ModalFlexType1>
                                    <div className="menu-modal">
                                        <StoreDetailStoreMenuImage2
                                            src={selectedMenu.mimage}
                                            alt="음식 썸네일"
                                            onError={(e) => {
                                                e.target.onerror = null; // 이후 재시도 방지
                                                e.target.src = storeImage; // 기본 이미지 경로로 교체
                                            }}
                                        />
                                        <ModalFlexType1>
                                            <h2>{selectedMenu.mname}</h2>
                                            <ModalHr/>
                                            <ModalFlexType2>
                                                <ModalFont1>가격</ModalFont1>
                                                <ModalFont1>{formatNumberWithCommas(selectedMenu.mmoney)}원</ModalFont1>
                                            </ModalFlexType2>
                                            <ModalHr/>
                                            <ModalFont2>{selectedMenu.mintro}</ModalFont2>
                                            <ModalFlexType3>
                                                {/* "담기" 버튼을 클릭하여 메뉴를 주문표에 추가 */}
                                                {isAuthenticated && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                                                    <ModalButton>담기</ModalButton>
                                                )}
                                                <ModalButton onClick={() => setShowModal(false)}>닫기</ModalButton>
                                            </ModalFlexType3>
                                        </ModalFlexType1>
                                    </div>
                                </ModalFlexType1>

                            )}

                            <BoardMainFlexType>
                                <BoardMainHeader>
                                    <BoardMainInputImageBox1>
                                        <BoardMainInputImage1 src={NoticeImage} alt="돋보기 이미지"/>
                                    </BoardMainInputImageBox1>
                                    <BoardMainInputType1
                                        type="text"
                                        placeholder="제목을 검색해주세요."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <BoardMainInputType2
                                        type="text"
                                        placeholder="YYYY. MM.DD ~ YYYY. MM.DD"
                                    ></BoardMainInputType2>

                                    <BoardMainButtonType1 onClick={handleSearch}>검색</BoardMainButtonType1>
                                </BoardMainHeader>

                                <BoardMainTable1>
                                    <BoardMainThead>
                                        <BoardMainTr>
                                            <BoardMainTh>번호</BoardMainTh>
                                            <BoardMainTh>제목</BoardMainTh>
                                            <BoardMainTh>작성자</BoardMainTh>
                                            <BoardMainTh>날짜</BoardMainTh>
                                        </BoardMainTr>
                                    </BoardMainThead>

                                    <BoardMainTbody>
                                        {getCurrentPosts().map((article, index) => (
                                            <BoardMainTr key={article.id}>
                                                <BoardMainTd>{index + 1 + (currentPage - 1) * postsPerPage}</BoardMainTd>
                                                <BoardMainTd>
                                                    <BoardMainLink to={`/board/${article.id}`}>{article.title}</BoardMainLink>
                                                </BoardMainTd>
                                                <BoardMainTd>{article.user.username}</BoardMainTd>
                                                <BoardMainTd>{extractDate(article.createdAt)}</BoardMainTd>
                                            </BoardMainTr>
                                        ))}
                                    </BoardMainTbody>
                                </BoardMainTable1>
                            </BoardMainFlexType>

                            <PageFlex1>
                                {/* 처음 페이지 버튼 */}
                                <BoardButton onClick={startPage}>&lt;&lt;</BoardButton>
                                {/* 이전 페이지 버튼 */}
                                <BoardButton onClick={prevPage}>&lt;</BoardButton>
                                {/* 페이징 컴포넌트 */}
                                <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={articles.length}
                                    paginate={paginate}
                                />
                                {/* 다음 페이지 버튼 */}
                                <BoardButton onClick={nextPage}>&gt;</BoardButton>
                                {/* 끝 페이지 버튼 */}
                                <BoardButton onClick={endPage}>&gt;&gt;</BoardButton>
                            </PageFlex1>

                            {isAuthenticated && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                                <Link to="/boardDetail">
                                    <WriteButton2> <WriteImage3 src={NoticeImage2} alt="프로필 아이콘 이미지"/> 게시물 등록하기</WriteButton2>
                                </Link>
                            )}

                            <StyledMainPage/>

                        </StoreDetailBody>
                        <StoreDetailBarFlex>
                            <StoreDetailBarAll>
                                <StoreDetailBar>
                                    <StoreDetailBarHeader>
                                        <StoreDetailBarHeaderText className="order">주문표</StoreDetailBarHeaderText>
                                        {isAuthenticated && (
                                            <StoreDetailBarHeaderIcon  onClick={createGroupOrder}>
                                                <StoreDetailBarHeaderText2>그룹주문</StoreDetailBarHeaderText2>
                                                <StoreDetailHeaderIconImage src={BoardShowImage3} alt="링크 아이콘 이미지"></StoreDetailHeaderIconImage>
                                            </StoreDetailBarHeaderIcon>
                                        )}
                                    </StoreDetailBarHeader>

                                    {groupOrderUrl && (
                                        <StoreDetailSectionText1>그룹 주문 링크: {groupOrderUrl}</StoreDetailSectionText1>
                                    )}
                                    <div className="order-list"></div>
                                    <StoreDetailFooter className="total-price">
                                        <StoreDetailSectionText2>합계 : 원</StoreDetailSectionText2>
                                    </StoreDetailFooter>
                                </StoreDetailBar>
                                <StoreDetailButtonType1>주문하기</StoreDetailButtonType1>
                            </StoreDetailBarAll>
                        </StoreDetailBarFlex>
                    </StoreDetailBody2>

                    <StyledArrow/>
                    <StyledFooter/>
                </HomeBody>
            ) : (
                <HomeBody>
                    <StyledLoginBefore/>
                    <StyledHeaderHome/>
                    <StyledHeaderBefore/>

                    <StoreDetailBody2>
                        <StoreDetailBody>
                            <StoreDetailStore>
                                {/* 가게 이름, 평점, 리뷰수, 최소 주문 금액, 배달 요금,
                        배달 예상 시간, 영업 시간, 전화번호, 주소 순서로 작성함 */}
                                {menus.length > 0 ? <StoreDetailStoreHeader>{menus[0].store.sname}</StoreDetailStoreHeader> : null}
                                <StoreDetailStoreTitle>
                                    {menus.length > 0 ?
                                        <StoreDetailStoreImage1
                                            src={menus[0].store.simage}
                                            alt="가게 썸네일"
                                            onError={(e) => {
                                                e.target.onerror = null; // 이후 재시도 방지
                                                e.target.src = storeImage; // 기본 이미지 경로로 교체
                                            }}
                                        /> : null}
                                    <StoreDetailStoreTitle2>
                                        {menus.length > 0 ? <StoreDetailStoreText1>⭐{menus[0].store.sgrade}</StoreDetailStoreText1> : null}
                                        {menus.length > 0 ? <StoreDetailStoreText1><StoreDetailStoreText2> 리뷰 :</StoreDetailStoreText2>{formatNumberWithCommas(menus[0].store.sreview)}</StoreDetailStoreText1> : null}
                                        {menus.length > 0 ? <StoreDetailStoreText1><StoreDetailStoreText2>💰 최소 주문 금액  : </StoreDetailStoreText2>{formatNumberWithCommas(menus[0].store.sorderMinimum)}원</StoreDetailStoreText1> : null}
                                        {menus.length > 0 ? <StoreDetailStoreText1> <StoreDetailStoreText2>💲  배달 요금 : </StoreDetailStoreText2>{formatNumberWithCommas(menus[0].store.stip)}원</StoreDetailStoreText1> : null}
                                        {menus.length > 0 ? <StoreDetailStoreText1> <StoreDetailStoreText2> ⏰ 배달 예상 시간 :  </StoreDetailStoreText2>{menus[0].store.stime}</StoreDetailStoreText1> : null}
                                    </StoreDetailStoreTitle2>

                                </StoreDetailStoreTitle>
                            </StoreDetailStore>

                            <StoreDetailStoreMenu>
                                <StoreDetailStoreMenuHeader>
                                    {/* 메뉴와 정보에 대한 클릭 이벤트 추가 */}
                                    <StoreDetailStoreMenuHeaderFont onClick={() => { setShowMenu(true); setShowInfo(false); }}>메뉴</StoreDetailStoreMenuHeaderFont>
                                    <StoreDetailStoreMenuHeaderFont onClick={() => { setShowMenu(false); setShowInfo(true); }}>정보</StoreDetailStoreMenuHeaderFont>
                                </StoreDetailStoreMenuHeader>

                                {/* 메뉴가 보이는 경우 */}
                                {showMenu && (
                                    <StoreDetailStoreMenuSection className="menu-list">
                                        {menus.map(menu => (
                                            <StoreDetailStoreMenuSectionFlex key={menu.menuId} className="menu-item" onClick={() => toggleModal(menu)}>
                                                <StoreDetailStoreMenuImage1
                                                    src={menu.mimage}
                                                    alt="음식 썸네일"
                                                    onError={(e) => {
                                                        e.target.onerror = null; // 이후 재시도 방지
                                                        e.target.src = storeImage; // 기본 이미지 경로로 교체
                                                    }}
                                                />
                                                {/*  메뉴 이름 - 메뉴 소개 - 가격 순서로 작성함 */}
                                                <StoreDetailStoreMenuSection2>
                                                    <h2>{menu.mname}</h2>
                                                    <p>{menu.mintro}</p>
                                                    <p>{formatNumberWithCommas(menu.mmoney)}원</p>
                                                </StoreDetailStoreMenuSection2>
                                            </StoreDetailStoreMenuSectionFlex>
                                        ))}
                                    </StoreDetailStoreMenuSection>
                                )}

                                {/* 정보가 보이는 경우 */}
                                {showInfo && (
                                    <StoreDetailStoreMenuSection3>
                                        <StoreDetailStoreText3>업체 정보</StoreDetailStoreText3>
                                        {menus.length > 0 ? <StoreDetailStoreText4> <StoreDetailStoreText2>영업 시간 </StoreDetailStoreText2>{menus[0].store.sopen}</StoreDetailStoreText4> : null}
                                        {menus.length > 0 ? <StoreDetailStoreText4> <StoreDetailStoreText2>☎️ 전화번호 </StoreDetailStoreText2>{menus[0].store.sphone}</StoreDetailStoreText4> : null}
                                        {menus.length > 0 ? <StoreDetailStoreText4><StoreDetailStoreText2>🏠 주소 </StoreDetailStoreText2>{menus[0].store.saddress}</StoreDetailStoreText4> : null}
                                    </StoreDetailStoreMenuSection3>
                                )}
                            </StoreDetailStoreMenu>

                            {/* 모달 내용 추가 */}
                            {showModal && selectedMenu && (
                                <ModalFlexType1>
                                    <div className="menu-modal">
                                        <StoreDetailStoreMenuImage2
                                            src={selectedMenu.mimage}
                                            alt="음식 썸네일"
                                            onError={(e) => {
                                                e.target.onerror = null; // 이후 재시도 방지
                                                e.target.src = storeImage; // 기본 이미지 경로로 교체
                                            }}
                                        />
                                        <ModalFlexType1>
                                            <h2>{selectedMenu.mname}</h2>
                                            <ModalHr/>
                                            <ModalFlexType2>
                                                <ModalFont1>가격</ModalFont1>
                                                <ModalFont1>{formatNumberWithCommas(selectedMenu.mmoney)}원</ModalFont1>
                                            </ModalFlexType2>
                                            <ModalHr/>
                                            <ModalFont2>{selectedMenu.mintro}</ModalFont2>
                                            <ModalFlexType3>
                                                {/* "담기" 버튼을 클릭하여 메뉴를 주문표에 추가 */}
                                                {isAuthenticated && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                                                    <ModalButton>담기</ModalButton>
                                                )}
                                                <ModalButton onClick={() => setShowModal(false)}>닫기</ModalButton>
                                            </ModalFlexType3>
                                        </ModalFlexType1>
                                    </div>
                                </ModalFlexType1>
                            )}

                            <BoardMainFlexType>
                                <BoardMainHeader>
                                    <BoardMainInputImageBox1>
                                        <BoardMainInputImage1 src={NoticeImage} alt="돋보기 이미지"/>
                                    </BoardMainInputImageBox1>
                                    <BoardMainInputType1
                                        type="text"
                                        placeholder="제목을 검색해주세요."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <BoardMainInputType2
                                        type="text"
                                        placeholder="YYYY. MM.DD ~ YYYY. MM.DD"
                                    ></BoardMainInputType2>

                                    <BoardMainButtonType1 onClick={handleSearch}>검색</BoardMainButtonType1>
                                </BoardMainHeader>

                                <BoardMainTable1>
                                    <BoardMainThead>
                                        <BoardMainTr>
                                            <BoardMainTh>번호</BoardMainTh>
                                            <BoardMainTh>제목</BoardMainTh>
                                            <BoardMainTh>작성자</BoardMainTh>
                                            <BoardMainTh>날짜</BoardMainTh>
                                        </BoardMainTr>
                                    </BoardMainThead>

                                    <BoardMainTbody>
                                        {getCurrentPosts().map((article, index) => (
                                            <BoardMainTr key={article.id}>
                                                <BoardMainTd>{index + 1 + (currentPage - 1) * postsPerPage}</BoardMainTd>
                                                <BoardMainTd>
                                                    <BoardMainLink to={`/board/${article.id}`}>{article.title}</BoardMainLink>
                                                </BoardMainTd>
                                                <BoardMainTd>{article.user.username}</BoardMainTd>
                                                <BoardMainTd>{extractDate(article.createdAt)}</BoardMainTd>
                                            </BoardMainTr>
                                        ))}
                                    </BoardMainTbody>
                                </BoardMainTable1>
                            </BoardMainFlexType>

                            <PageFlex1>
                                {/* 처음 페이지 버튼 */}
                                <BoardButton onClick={startPage}>&lt;&lt;</BoardButton>
                                {/* 이전 페이지 버튼 */}
                                <BoardButton onClick={prevPage}>&lt;</BoardButton>
                                {/* 페이징 컴포넌트 */}
                                <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={articles.length}
                                    paginate={paginate}
                                />
                                {/* 다음 페이지 버튼 */}
                                <BoardButton onClick={nextPage}>&gt;</BoardButton>
                                {/* 끝 페이지 버튼 */}
                                <BoardButton onClick={endPage}>&gt;&gt;</BoardButton>
                            </PageFlex1>

                            {isAuthenticated && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                                <Link to="/boardDetail">
                                    <WriteButton2> <WriteImage3 src={NoticeImage2} alt="프로필 아이콘 이미지"/> 게시물 등록하기</WriteButton2>
                                </Link>
                            )}

                            <StyledMainPage/>
                        </StoreDetailBody>

                        <StoreDetailBarFlex>
                            <StoreDetailBarAll>
                                <StoreDetailBar>
                                    <StoreDetailBarHeader>
                                        <StoreDetailBarHeaderText className="order">주문표</StoreDetailBarHeaderText>
                                        {isAuthenticated && (
                                            <StoreDetailBarHeaderIcon  onClick={createGroupOrder}>
                                                <StoreDetailBarHeaderText2>그룹주문</StoreDetailBarHeaderText2>
                                                <StoreDetailHeaderIconImage src={BoardShowImage3} alt="링크 아이콘 이미지"></StoreDetailHeaderIconImage>
                                            </StoreDetailBarHeaderIcon>
                                        )}
                                    </StoreDetailBarHeader>

                                    {groupOrderUrl && (
                                        <StoreDetailSectionText1>그룹 주문 링크: {groupOrderUrl}</StoreDetailSectionText1>
                                    )}
                                    <div className="order-list"></div>
                                    <StoreDetailFooter className="total-price">
                                        <StoreDetailSectionText2>합계 : 원</StoreDetailSectionText2>
                                    </StoreDetailFooter>
                                </StoreDetailBar>
                                <StoreDetailButtonType1>주문하기</StoreDetailButtonType1>
                            </StoreDetailBarAll>
                        </StoreDetailBarFlex>
                    </StoreDetailBody2>

                    <StyledArrow/>
                    <StyledFooter/>
                </HomeBody>
            )}
        </>
    );
}

export default StoreDetail;