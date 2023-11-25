import {
    Contents,
    ContentsBox,
    ContentsImage,
    ContentsText1,
    ContentsText2,
    ContentsText3,
    ContentsText4,
    StyledLink3
} from "../../HomeCss";
import React from "react";
import menuImage1 from "../../images/ChickenPicture.jpg";
import menuImage4 from "../../images/PizzaPicture.jpg";
import menuImage3 from "../../images/Late-night snack picture.jpg";

const StyledAi = ({ }) => {
    return (
        <>
            <ContentsText1>M A T N A M O</ContentsText1>
            <ContentsText2>
                " 오늘의  &nbsp;<ContentsText3>추천 음식&nbsp;</ContentsText3>{" "}
                먹으러 가볼까? "
            </ContentsText2>
            <Contents>
                <ContentsBox>
                    <ContentsImage src={menuImage1} alt="메뉴 음식 이미지" />
                    <ContentsText4><StyledLink3 to="/store/category/CHICKEN">치킨</StyledLink3></ContentsText4>
                </ContentsBox>
                <ContentsBox>
                    <ContentsImage src={menuImage4} alt="메뉴 음식 이미지" />
                    <ContentsText4> <StyledLink3 to="/store/category/PIZZA">피자</StyledLink3></ContentsText4>
                </ContentsBox>
                <ContentsBox>
                    <ContentsImage src={menuImage3} alt="메뉴 음식 이미지" />
                    <ContentsText4><StyledLink3 to="/store/category/NIGHT">야식</StyledLink3></ContentsText4>
                </ContentsBox>
            </Contents>
        </>
    );
};

export default StyledAi;
