// src/components/admin/notice/Notice.js

/*
* 공지사항 페이지
* 작성된 공지사항 테이블 형태로 나타냄
* 순번, 제목, 작성자, 작성일 순서로 테이블 구성
* 로그인 성공 후 관리자만  `글쓰기` 버튼 이용 가능
* 로그인 전에는 `글쓰기` 버튼 보이지 않도록 구현함
*/

import React, { } from 'react';
import {
    HomeBody
} from "../../HomeCss";
import StyledFooter from "../../style/StyledFooter";
import StyledHeaderBefore from "../../style/Header/StyledHeaderBefore";
import StyledLogInBefore from "../../style/Header/StyledLogInBefore";
import StyledMainPage from "../../style/StyledMainPage";
import StyledLoginAfter from "../../style/Header/StyledLoginAfter";
import StyledHeaderHome from "../../style/Header/StyledHeaderHome";
import StyledHeaderAfter from "../../style/Header/StyledHeaderAfter";
import useAuthStatus from "../../style/Backend/useAuthStatus";
import StyledNotice from "../../style/Notice/StyledNotice";
import StyledAi from "../../style/Header/StyledAi";
import StyledArrow from "../../style/StyledArrow";

function Notice() {
    const {isAuthenticated } = useAuthStatus();

    return (
        <div>
            {isAuthenticated ? (
                <HomeBody>
                    <StyledLoginAfter/>
                    <StyledHeaderHome/>
                    <StyledHeaderAfter/>
                    <StyledAi/>

                    <StyledNotice/>

                    <StyledArrow/>
                    <StyledMainPage/>
                    <StyledFooter/>
                </HomeBody>
            ) : (
                <HomeBody>
                    <StyledLogInBefore/>
                    <StyledHeaderHome/>
                    <StyledHeaderBefore/>
                    <StyledAi/>

                    <StyledNotice/>

                    <StyledArrow/>
                    <StyledMainPage/>
                    <StyledFooter/>
                </HomeBody>
            )}
        </div>
    );

}

export default Notice;