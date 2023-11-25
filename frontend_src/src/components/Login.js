// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Body,
  BodyWrapper,
  BodyWrapper_TextWrapper,
  LoginKeepLWrapper,
  TitleLogin,
  InputOption_1,
  InputOption_2,
  LoginKeepLFont,
  FindPasswordFont,
  ErrorTextFront,
  LoginButton,
  JoinWrapper,
  StyledLink,
  Logo,
  FooterText2, Form1, BodyGrient, LoginBackGroundImage, FooterText3
} from "./LoginCss.js";

// import logoImage1 from "./images/LogoImage1.png";
import LoginBackGroundImage1 from "./images/LoginBackGroundImage.jpg";
import proImage1 from "./images/main_pro.png";
function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    // 사용자 아이디와 비밀번호를 백엔드로 보냅니다.
    axios
        .post("/login", { userId, password })
        .then((response) => {
          // 로그인 성공 시 서버로부터의 응답을 처리합니다.
          // 예를 들어, 서버에서 "로그인 성공" 메시지를 보낸다고 가정합니다.
          if (response.data === "로그인 성공") {
            // 로그인 성공 시 메인 페이지로 리다이렉트하거나 다른 작업을 수행할 수 있습니다.
            window.location.href = "/"; // 메인 페이지로 리다이렉트
          } else {
            // 로그인 실패 시 메시지를 표시할 수 있습니다.
            setErrorMessage(" ID 또는 비밀번호를 잘못 입력하셨습니다.");
          }
        })
        .catch((error) => {
          // 오류 발생 시 처리
          if (!userId) {
            setErrorMessage(" ID가 입력되지 않았습니다.");
          } else if (userId && !password) {
            setErrorMessage(" 비밀번호가 입력되지 않았습니다.");
          } else {
            setErrorMessage("");
            console.error(error);
            Swal.fire({
              title: "네트워크 오류",
              text: "네트워크 설정을 확인하세요",
              icon: "warning",
              confirmButtonText: "확인",
            });
          }
        });
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
      <Body>
          <LoginBackGroundImage src={LoginBackGroundImage1} alt="프로필 아이콘 이미지">
          </LoginBackGroundImage>
        <BodyGrient>
        {/* <LogoImage1 src={logoImage1} alt="프로필 아이콘 이미지"/> */}
        <Logo>MatNaMo</Logo>
        <BodyWrapper>
          <TitleLogin>로그인</TitleLogin>
          <Form1 onKeyPress={handleEnterKeyPress}>
            <InputOption_1
                placeholder=" 아이디 또는 학번"
                type="text"
                id="userId"
                name="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
            />
            <InputOption_1
                placeholder=" 비밀번호"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <BodyWrapper_TextWrapper>
              <LoginKeepLWrapper>
                <InputOption_2 type="checkbox" name="example" value="checkbox_value" />
                <LoginKeepLFont>로그인 유지하기</LoginKeepLFont>
              </LoginKeepLWrapper>
              <FindPasswordFont>비밀번호를 잊었습니까?</FindPasswordFont>
            </BodyWrapper_TextWrapper>
            <LoginButton type="button" onClick={handleLogin}>
              로그인
            </LoginButton>
            <ErrorTextFront>{errorMessage}</ErrorTextFront>
            <JoinWrapper>
              <LoginKeepLFont>아직 회원이 아닙니까?</LoginKeepLFont>
              <StyledLink to="/signup">
                <FindPasswordFont>회원가입</FindPasswordFont>
              </StyledLink>
            </JoinWrapper>
          </Form1>
        </BodyWrapper>
        <FooterText3>@2023 Capstone Project MatNaMo</FooterText3>
        </BodyGrient>
      </Body>
  );
}

export default Login;
