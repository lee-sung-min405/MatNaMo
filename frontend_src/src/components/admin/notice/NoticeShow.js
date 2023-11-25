// src/components/admin/notice/NoticeShow.js
/* 공지사항 상세 페이지
* 관리자만 수정, 삭제 버튼 생성됨
*/

import React from 'react';

import {
    HomeBody
} from "../../HomeCss";

import StyledFooter from "../../style/StyledFooter";
import StyledHeaderBefore from "../../style/Header/StyledHeaderBefore";
import StyledLogInBefore from "../../style/Header/StyledLogInBefore";
import StyledHeaderHome from "../../style/Header/StyledHeaderHome";
import StyledHeaderAfter from "../../style/Header/StyledHeaderAfter";
import StyledLoginAfter from "../../style/Header/StyledLoginAfter";
import useAuthStatus from "../../style/Backend/useAuthStatus";
import StyledNoticeShow from "../../style/Notice/StyledNoticeShow";
import StyledArrow from "../../style/StyledArrow";

function NoticeShow() {
    const {isAuthenticated } = useAuthStatus();


    return (

        <div>
            {isAuthenticated ? (
                <HomeBody>
                    <StyledLoginAfter/>
                    <StyledHeaderHome/>
                    <StyledHeaderAfter/>

                    <StyledNoticeShow/>

                    <StyledArrow/>
                    <StyledFooter/>

                </HomeBody>


            ) : (
                <HomeBody>
                    <StyledLogInBefore/>
                    <StyledHeaderHome/>
                    <StyledHeaderBefore/>

                    <StyledNoticeShow/>

                    <StyledArrow/>
                    <StyledFooter/>
                </HomeBody>
            )}
        </div>
    );
}

export default NoticeShow;


