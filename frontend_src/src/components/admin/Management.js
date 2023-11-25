/*
* 사용자 관리 페이지
* 관리자만 접근 가능
* 관리자를 제외한 나머지 모든 사용자 정보를 테이블 형식으로 저장
* 사용자 삭제 가능 -> db에 저장된 사용자 삭제
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    HomeBody
} from "../HomeCss"

import {
    ButtonType1,
    FontType1,
    TalbleType1, TbodyType1, TdTpye1, TdType1, TheadType1, TrType1


} from "./ManagementCss"

import StyledLoginAfter from "../style/Header/StyledLoginAfter";
import StyledHeaderHome from "../style/Header/StyledHeaderHome";
import StyledHeaderAfter from "../style/Header/StyledHeaderAfter";
import StyledMainPage from "../style/StyledMainPage";
import StyledArrow from "../style/StyledArrow";
import StyledFooter from "../style/StyledFooter";

function Management() {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        // 서버로부터 사용자 목록을 가져오는 요청을 보냅니다.
        axios.get('/management')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('사용자 목록을 불러오는 중 오류가 발생했습니다:', error);
            });
    }, []);

    const handleDeleteUser = (userId) => {
        // 사용자 삭제 요청 보내기
        axios.post(`/management/delete/${userId}`)
            .then(response => {
                // 삭제 요청이 성공하면 사용자 목록을 업데이트합니다.
                if (response.data === '사용자 삭제 성공') {
                    setUsers(users.filter(user => user.userId !== userId));
                } else {
                    // 삭제 실패 시 에러 처리
                    console.error('사용자 삭제에 실패했습니다.');
                }
            })
            .catch(error => {
                console.error('사용자 삭제 요청 중 오류가 발생했습니다:', error);
            });
    };


    return (
        <HomeBody>
            <StyledLoginAfter/>
            <StyledHeaderHome/>
            <StyledHeaderAfter/>

            <FontType1>사용자 관리</FontType1>

            <TalbleType1>
                <TheadType1>
                    <TrType1>
                        <TdType1>아이디</TdType1>
                        <TdType1>이름</TdType1>
                        <TdType1>학과</TdType1>
                        <TdType1>전화 번호</TdType1>
                        <TdType1>주소</TdType1>
                    </TrType1>
                </TheadType1>
                <TbodyType1>
                    {users.map(user => (
                        <TrType1 key={user.userId}>
                            <TdTpye1>{user.userId}</TdTpye1>
                            <TdTpye1>{user.username}</TdTpye1>
                            <TdTpye1>{user.department}</TdTpye1>
                            <TdTpye1>{user.phone}</TdTpye1>
                            <TdTpye1>{user.address} {user.detailsAddress}</TdTpye1>
                            <TdTpye1>
                                <ButtonType1 onClick={() => handleDeleteUser(user.userId)}>삭제</ButtonType1>
                            </TdTpye1>
                        </TrType1>
                    ))}
                </TbodyType1>
            </TalbleType1>

            <StyledMainPage/>
            <StyledArrow/>
            <StyledFooter/>
        </HomeBody>
    );
}

export default Management;
