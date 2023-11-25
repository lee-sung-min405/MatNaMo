import {
    BoardButton,
    BoardMainButtonType1, BoardMainFlexType,
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
    BoardMainTr, PageFlex1, Pagination, WriteButton2, WriteImage3
} from "../../user/board/BoardCss";
import NoticeImage from "../../images/NoticeImage.png";
import {Link} from "react-router-dom";
import NoticeImage2 from "../../images/NoticeImage2.png";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import useAuthStatus from "../Backend/useAuthStatus";

const StyledBoard = ({ }) => {
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const postsPerPage = 10; // 페이지당 게시물 수

    const [articles, setArticles] = useState([]);
    const { isAuthenticated } = useAuthStatus();
    const [setIsAuthenticated] = useState(false); // 사용자 로그인 상태

    const [search, setSearch] = useState(''); // 검색어 상태 추가

    // 페이지 변경 시 호출되는 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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


    useEffect(() => {
        axios.get('/board')
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error('게시글 목록을 가져오는 중 오류가 발생했습니다:', error);
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
    }, []);

    return (
        <>
            <BoardMainFlexType>
                <BoardMainHeader>
                    <BoardMainInputImageBox1>
                        <BoardMainInputImage1 onClick={handleSearch} src={NoticeImage} alt="돋보기 이미지"/>
                    </BoardMainInputImageBox1>
                    <BoardMainInputType1
                        type="text"
                        placeholder="제목을 검색해주세요."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {    //  Enter 눌러도 검색됨
                                handleSearch();
                            }
                        }}
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
                            <BoardMainTh>순번</BoardMainTh>
                            <BoardMainTh>제목</BoardMainTh>
                            <BoardMainTh>작성자</BoardMainTh>
                            <BoardMainTh>작성일</BoardMainTh>
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
            </BoardMainFlexType>
        </>
    );
};

export default StyledBoard;