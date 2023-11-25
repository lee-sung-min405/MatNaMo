import styled from "@emotion/styled";
import { keyframes } from "@emotion/react"; // 여기를 수정
import { Link } from "react-router-dom";

const zoomIn = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;

export const Body = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;
export const JoinBodyWapper = styled.div``;

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0px 50px 15px 50px;
  border: 1px solid rgba(0, 0, 0, 20%);
  border-radius: 10px;
  width: 500px;
  padding: 20px;
  box-shadow: 3px 3px 5px #bdbdbd;
  background-color: white;
`;

export const Form1 =styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const TitleLogin = styled.h1`
  margin-bottom: 20px;
  color: #664200;
`;

export const InputOption_1 = styled.input`
  width: 400px;
  height: 50px;
  background-color: #f9f9f9;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  margin: 5px;
  font-size: 16px;
`;

export const InputOption_1_1 = styled.input`
  width: 400px;
  height: 50px;
  background-color: #f9f9f9;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  margin: 5px;
  font-size: 16px;
  margin-left: 47px;
`;

export const BodyWrapper_TextWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
`;

export const LoginKeepLWrapper = styled.label`
  display: flex;
  flex-direction: row;
`;

export const InputOption_2 = styled.input``;

export const LoginKeepLFont = styled.div`
  color: #8d8d8d;
  font-size: 13px;
  font-weight: 600;
  margin-left: 5px;
`;

export const FindPasswordFont = styled.div`
  color: #e49400;
  font-size: 13px;
  cursor: pointer;
`;

export const LoginButton = styled.button`
  background-color: #e49400;
  border: 1px solid #e49400;
  border-radius: 5px;
  width: 400px;
  height: 50px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-top: 50px;
  cursor: pointer;
`;

export const LoginButton_2 = styled.button`
  background-color: #e49400;
  border: 1px solid #e49400;
  border-radius: 5px;
  width: 400px;
  height: 50px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-top: 50px;
  cursor: pointer;
  margin-left: 47px;
`;
export const LoginButton_3 = styled.button`
  background-color: #e49400;
  border: 1px solid #e49400;
  border-radius: 5px;
  width: 90px;
  height: 50px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 10px;
`;

export const JoinWrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 65px;
`;

export const PhoneWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const InputApi = styled.input`
  width: 290px;
  height: 50px;
  background-color: #f9f9f9;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  margin: 5px;
  font-size: 16px;
  margin-left: 47px;
`;

export const Select_1 = styled.select`
width: 100px;
height: 50px;
background-color: #f9f9f9;
border: 1px solid #bdbdbd;
border-radius: 5px;
margin:5px;
font-size: 16px;'`;

export const Option_1 = styled.option``;

export const ErrorTextFront = styled.div`
  margin-top: 20px;
  color: red;
  font-weight: 600;
  font-size: 11px;
`;

export const ErrorTextFront2 = styled.div`
  margin: 0px;
  margin-left: 50px;
  color: red;
  font-weight: 600;
  font-size: 11px;
`;

export const ErrorTextFront_1 = styled.div`
  margin-bottom: 15px;
  color: red;
  font-weight: 600;
  font-size: 11px;
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export  const Logo = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 45px;
  font-weight: 900;
  color: white;
  text-shadow: 3px 3px 5px gray;
  margin-bottom: 20px;
  margin-top: 120px;
`

export  const Logo2 = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 45px;
  font-weight: 900;
  color: white;
  text-shadow: 3px 3px 5px gray;
  margin-top: 20px;
  margin-bottom: 20px;
`

export  const FooterText2 = styled.div`
  font-weight: 600;
  font-size: 12px;
  color:#828282;
`
export  const FooterText3 = styled.div`
  font-weight: 600;
  font-size: 12px;
  color:#828282;
  margin-bottom: 100px;
`
export const LogoImage1 = styled.img`
  margin: 40px;
  padding: 0px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  width: 253px;
  height: 180px;
`;

export const BodyGrient=styled.div`
  width: 100%;
  height: 955px;
  //border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgba(228,148,0,20%),rgba(228,148,0,60%),rgba(228,148,0,100%));
  position: absolute;
`
export const LoginBackGroundImage = styled.img`
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 955px;
  object-fit: cover; /* 이미지를 자르지 않고 확대/축소하여 채우기 */
  animation: ${zoomIn} 3s alternate forwards; /* 3초 동안 확대/축소 한 번만 반복 후 유지 */
`;