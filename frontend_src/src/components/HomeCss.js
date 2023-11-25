import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const ArrowUp = styled.img`
 width: 30px; /* 이미지 크기 조정 */
 height: 30px; /* 이미지 크기 조정 */
 position: fixed; /* 페이지 내 고정 위치 */
 bottom: 50px; /* 하단에서의 위치 */
 right: 40px; /* 오른쪽에서의 위치 */
 cursor: pointer; /* 마우스 오버 시 커서 변경 */
 z-index: 1000; /* 다른 요소 위에 표시 */
`;

export const ArrowDown = styled.img`
 width: 30px; /* 이미지 크기 조정 */
 height: 30px; /* 이미지 크기 조정 */
 position: fixed; /* 페이지 내 고정 위치 */
 bottom: 20px; /* 하단에서의 위치 */
 right: 40px; /* 오른쪽에서의 위치 */
 cursor: pointer; /* 마우스 오버 시 커서 변경 */
 z-index: 1000; /* 다른 요소 위에 표시 */
`;

export const HomeBody = styled.div`
 box-sizing: border-box;
 margin: 0px;
 padding: 0px;
 display: flex;
 flex-direction: column;
 align-items: center;
 background-color: #fff8eb;
`;

export const Header = styled.div`
 width: 100%;
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-around;
 height: 80px;
`;

export const LoginSignUp = styled.div`
 width: 160px;
 display: flex;
 flex-direction: row;
 align-items: flex-start;
 justify-content: space-between;
`;

export const Logo = styled.div`
 width: 125px;
 height: 36px;
 color: #000000;
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
 font-size: 27px;
 font-weight: 700;
`;

export const StyledLink1 = styled(Link)`
 text-decoration: none;
 color: rgba(0, 0, 0, 0.7);
 font-weight: 700;
 font-size: 16px;
`;

export const StyledLink2 = styled(Link)`
 text-decoration: none;
 margin: 10px 50px 10px 20px;
 color: rgba(0, 0, 0, 0.7);
 font-weight: 700;
 font-size: 18px;
`;

export const StyledLink3 = styled(Link)`
  text-decoration: none;
  color: white;
  width: 100%;
  height: 100%;
`;

export const StyledLink4 = styled(Link)`
 text-decoration: none;
 color: #BDBDBD;
 font-weight: 700;
 font-size: 14px;
 margin-left:20px;
`;

export const Login = styled.div`
 height: 44px;
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
`;

export const SignUp = styled.div`
 width: 92px;
 height: 44px;
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 background-color: #e49400;
 border-radius: 10px;
`;

export const HeaderImage = styled.img`
 margin: 0px;
 padding: 0px;
 width: 100%;
 height: 400px;
 object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
 position: relative;
 z-index: 0;
`;

export const HeaderText1 = styled.div`
 width: 100%;
 height: 0px;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: flex-start;
 position: absolute;
 color: white;
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
 font-size: 30px;
 font-weight: 600;
 top: 80px;
`;

export const HeaderText2 = styled.div`
 color: white;
 font-size: 50px;
 font-weight: 700;
 z-index: 2;
 margin-top: 90px;
 margin-bottom: 40px;
`;
export const HeaderText3 = styled.div`
 color: white;
 font-size: 14px;
 font-weight: 600;
 z-index: 2;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: space-around;
`;
export const HeaderText4 = styled.div`
 margin-bottom: 5px;
`;

export const HeaderText5 = styled.span`
 color: #e49400;
`;
export const HeaderBackgroundColor = styled.div`
 width: 100%;
 height: 400px;
 position: absolute;
 background-color: rgba(0, 0, 0, 0.5);
 z-index: 1;
`;

export const Menu = styled.div`
 width: 100%;
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 background-color: #e49400;
`;
export const MenuText = styled.div`
 color: white;
 font-size: 25px;
 font-weight: 400;
 margin-right: 40px;
`;

export const ContentsText1 = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 color: #e49400;
 margin-top: 70px;
 font-weight: 600;
`;

export const ContentsText2 = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 font-size: 25px;
 font-weight: 500;
 margin-top: 10px;
`;

export const ContentsText3 = styled.div`
 font-size: 25px;
 font-weight: 700;
`;

export const Contents = styled.div`
 width: 1300px;
 display: flex;
 flex-wrap: wrap;
 flex-direction: row;
 align-content: space-between;
 justify-content: space-around;
 margin: 50px;
 position: relative;
`;

export const ContentsBox = styled.div`
 width: 330px;
 height: 330px;
 border-radius: 20px;
 background-color: white;
 margin-bottom: 50px;
 overflow: hidden;
 cursor: pointer;
 box-shadow: 7px 7px 5px #bdbdbd;
 position: relative;

 &:after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
 }

 &:hover:after {
  opacity: 1;
 }
`;

export const ContentsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ContentsText4 = styled.div`
 width: 100%;
 height: 100%;
 position: absolute;
 font-size: 25px;
 font-weight: 600;
 color: white;
 top: 240px;
 left: 30px;
 z-index: 3;
 text-shadow: 1px 1px 5px #000000;
`;

export const ContentsText5 = styled.div``;

export const HeaderProImage = styled.img`
 margin: 0px;
 padding: 0px;
 object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
 width: 45px;
 height: 45px;
 //position: relative;
 //z-index: 0;
`;

export const HeaderProImage2 = styled.img`
 margin: 0px;
 padding: 0px;
 object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
 width: 70px;
 height: 70px;
 margin-bottom: 20px;
`;

export const HeaderProButtonImage = styled.img`
 margin: 0px;
 padding: 0px;
 object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
 margin-right: 80px;
 position: relative;
 cursor: pointer;

 //z-index: 0;
`;

export const MyproImage = styled.img`
 margin: 0px;
 padding: 0px;
 object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
 //z-index: 0;
`;


export const HeaderProBox = styled.div`
 position: absolute;
 margin: 0px;
 top: 40px;
 right: 20%;
 z-index: 3;
 transition: opacity 0.3s ease;
 opacity: ${(props) => (props.isVisible ? 0 : 1)};
`;

export const HeaderProButtonClick = styled.img`
 margin: 0px;
 padding: 0px;
 object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
 margin-right: 74px;
`;
export  const HeaderProBoxSection =styled.div`
 position: absolute;
 top:50px;
 right:120px;
`

export const ProBox = styled.div`
 display: flex;
 flex-direction: row;
 align-items: flex-start;
 justify-content: start;
 width:200px;

`
export  const HeaderProText =styled.div`
 font-size: 16px;
 font-weight: 700;
 margin-left: 15px;
`
export  const Hr=styled.hr`
 font-size: 20px;

`
export  const Hr2=styled.hr`
 font-size: 20px;
`
export  const BoxLayout = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content:start;
 margin-top:20px;
`
export  const Footer = styled.div`
 background: #F5EEE2;
 width: 100%;
 height: 300px;
 margin-top: 50px;
`
export  const Footer1 = styled.div`
 margin-top: 3%;
 margin-left: 17%;
 margin-right: 17%;
`
export  const FooterText = styled.div`
 font-weight: 900;
 font-size: 18px;
 color:#828282;
 margin-bottom: 30px;
`
export  const FooterText2 = styled.div`
 font-weight: 600;
 font-size: 12px;
 color:#828282;
 margin-top: 7px;
 margin-left: 15%;
`
export const FooterImage = styled.img`
 margin: 10px;
 padding: 0px;
 object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
`;

export  const FooterImages=styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`
export const LogoImage2 = styled.img`
  margin: 0px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  width: 55px;
  height: 40px;
`;

export  const HomeLogoImage=styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: start;
`