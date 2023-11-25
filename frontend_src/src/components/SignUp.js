// src/components/SignUp.js

import React, { useState } from "react";
import axios from "axios";
import {
  Body,
  BodyWrapper,
  TitleLogin,
  InputOption_1_1,
  InputApi,
  LoginKeepLFont,
  FindPasswordFont,
  ErrorTextFront2,
  LoginButton_2,
  LoginButton_3,
  JoinWrapper,
  StyledLink, Logo2, FooterText2,BodyGrient,LoginBackGroundImage
} from "./LoginCss";

import Swal from "sweetalert2";
import LoginBackGroundImage1 from "./images/LoginBackGroundImage.jpg";

const DeuDepartment = [
  "국어국문학과",
  "중국어학과",
  "일본어학과",
  "영어영문학과",
  "문헌정보학과",
  "평생교육,청소년상담학과",
  "유아교육과",
  "미디어,광고학부",
  "법,경찰행정학부",
  "소방방재행정학과",
  "공공인재학부",
  "경제,금융보험,재무부동산학부",
  "부동산금융,자산경영학과",
  "무역,유통학부",
  "경영학부",
  "정보경영학부",
  "외식경영학과",
  "스마트호스피탈리티학과",
  "치위생학과",
  "방사선학과",
  "의료경영학과",
  "보육,가정상담학과",
  "식품영양학과",
  "한의예과",
  "한의학과",
  "신소재공학부",
  "디자인공학부",
  "기계자동차로봇부품공학부",
  "산업융합시스템공학부",
  "미래형자동차학과",
  "신소재공학부",
  "디자인공학부",
  "기계자동차로봇부품공학부",
  "산업융합시스템공학부",
  "미래형자동차학과",
  "창의소프트웨어공학부",
  "전기전자통신공학부",
  "디지털콘텐츠게임공학부",
  "영화학과",
  "소프트웨어융합학과",
  "음악학과",
  "디자인조형학과",
  "패션디자인학과",
  "체육학과",
];

function SignUp() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [detailsAddress, setDetailsAddress] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [PhoneError, setPhoneError] = useState("");

  //  주소 API
  const openAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 선택한 주소를 가져와서 입력 필드를 업데이트
        setAddress(data.address);
      },
    }).open();
  };

  const validateInput = () => {
    // 초기화
    setUserIdError("");
    setPasswordError("");
    setDepartmentError("");
    setAddressError("");
    setPhoneError("");

    // 유효성 검사
    if (!/^\d{8}$/.test(userId)) {
      setUserIdError("학번(아이디)는 숫자 8자리여야 합니다.");
    }

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
      setPasswordError(
          "비밀번호는 숫자, 대소문자, 특수문자를 모두 포함해야 합니다."
      );
    }

    if (!DeuDepartment.includes(department)) {
      setDepartmentError("유효하지 않은 학과입니다.");
    }

    if (!address) {
      setAddressError("주소를 입력해주세요.");
    }

    // 휴대폰 번호 유효성 검사 (010-0000-0000 형식)
    if (!/^010-\d{4}-\d{4}$/.test(phone)) {
      setPhoneError("휴대폰 번호는 010-0000-0000 형식으로 입력해주세요.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 사용자 정보
    const userData = {
      userId,
      username,
      department,
      password,
      phone,
      address,
      detailsAddress,
    };

    // 백엔드로 POST 요청을 보냄.
    axios
        .post("/signup", userData)
        .then((response) => {
          // 회원가입 성공 시 로그인 페이지로 이동
          if (response.data.message === "회원 가입 성공") {
            Swal.fire({
              title: '가입 완료!',
              text: '회원 가입에 성공하였습니다.',
              icon: 'success',
              confirmButtonText: '확인'
            });
            setTimeout(() =>  window.location.href = "/login", 2000); //  2초 대기 후 로그인 화면으로 리다이렉트
          } else {
            // 실패할 경우 에러를 처리
            Swal.fire({
              title: '회원가입 실패',
              text: '다시 입력하세요!',
              icon: 'error',
              confirmButtonText: '확인'
            });
            console.error("회원가입 실패", response.data.message);
          }
        })
        .catch((error) => {
          // 요청 오류를 처리
          Swal.fire({
            title: '회원가입 실패',
            text: '다시 입력하세요!',
            icon: 'error',
            confirmButtonText: '확인'
          });
          console.error("회원가입 실패", error);
        });
  };

  return (
      <Body>
        <LoginBackGroundImage src={LoginBackGroundImage1} alt="프로필 아이콘 이미지">
        </LoginBackGroundImage>
        <BodyGrient>
          <Logo2>MatNaMo</Logo2>
          <BodyWrapper>
            <TitleLogin>회원 가입</TitleLogin>
            <form onSubmit={handleSubmit}>
              <InputOption_1_1
                  placeholder=" 학번"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
              />
              <ErrorTextFront2>{userIdError}</ErrorTextFront2>

              <InputOption_1_1
                  placeholder=" 이름"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />

              <InputOption_1_1
                  placeholder=" 학과"
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
              />
              <ErrorTextFront2>{departmentError}</ErrorTextFront2>

              <InputOption_1_1
                  placeholder=" 비밀번호"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <ErrorTextFront2>{passwordError}</ErrorTextFront2>

              <InputOption_1_1
                  placeholder=" 휴대폰 번호"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
              />
              <ErrorTextFront2>{PhoneError}</ErrorTextFront2>

              <InputApi type="text" value={address} readOnly />
              <LoginButton_3 type="button" onClick={openAddressSearch}>
                검색
              </LoginButton_3>

              <InputOption_1_1
                  placeholder=" 상세 주소"
                  type="text"
                  value={detailsAddress}
                  onChange={(e) => setDetailsAddress(e.target.value)}
              />
              <ErrorTextFront2>{addressError}</ErrorTextFront2>
              <LoginButton_2 type="submit" onClick={validateInput}>
                회원가입
              </LoginButton_2>
            </form>
            <JoinWrapper>
              <LoginKeepLFont>이미 회원이십니까?</LoginKeepLFont>
              <StyledLink to="/login">
                <FindPasswordFont>로그인</FindPasswordFont>
              </StyledLink>
            </JoinWrapper>
          </BodyWrapper>
          <FooterText2>@2023 Capstone Project MatNaMo</FooterText2>
        </BodyGrient>

      </Body>
  );
}

export default SignUp;