// src/components/admin/notice/NoticeUpdate.js
/* 공지사항 수정 페이지*/
import React from 'react';
import {
    HomeBody
} from "../../HomeCss";

import {
    BodyWrapper
} from "./NoticeDetailCss";
import StyledFooter from "../../style/StyledFooter";
import StyledLoginAfter from "../../style/Header/StyledLoginAfter";
import StyledHeaderHome from "../../style/Header/StyledHeaderHome";
import StyledHeaderAfter from "../../style/Header/StyledHeaderAfter";
import StyledArrow from "../../style/StyledArrow";
import StyledNoticeUpdate from "../../style/Notice/StyledNoticeUpdate";

function NoticeUpdate() {

    return (
        <HomeBody>
            <StyledLoginAfter/>
            <StyledHeaderHome/>
            <StyledHeaderAfter/>

            <BodyWrapper>
                <StyledNoticeUpdate/>
            </BodyWrapper>

            <StyledArrow/>
            <StyledFooter/>
        </HomeBody>
    );
}

export default NoticeUpdate;
