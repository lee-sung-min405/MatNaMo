//  src/components/admin/notice/NoticeDetail.js
/*  공지사항 작성 페이지 */

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
import StyledNoticeDetail from "../../style/Notice/StyledNoticeDetail";

function NoticeDetail() {

    return (
        <HomeBody>
            <StyledLoginAfter/>
            <StyledHeaderHome/>
            <StyledHeaderAfter/>

            <BodyWrapper>
                <StyledNoticeDetail/>
            </BodyWrapper>

            <StyledArrow/>
            <StyledFooter/>

        </HomeBody>
    );
}

export default NoticeDetail;
