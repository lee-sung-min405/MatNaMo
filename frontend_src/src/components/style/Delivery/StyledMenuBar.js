import {
    StoreMenu,
    StoreMenuHead,
    StoreMenuImgType,
    StoreMenuLi,
    StoreMenuLink,
    StoreMenuTextTpye,
    StoreMenuUl
} from "../../delivery/StoreCss";
import menu5 from "../../images/menu5.png";
import menu6 from "../../images/menu6.png";
import menu4 from "../../images/menu4.png";
import menu3 from "../../images/menu3.png";
import menu1 from "../../images/menu1.png";
import menu2 from "../../images/menu2.png";
import React from "react";

const StyledMenuBar = ({ }) => {
    return (
        <>
            <StoreMenu>
                <StoreMenuHead>M A T N A M O&nbsp;&nbsp; M E N U</StoreMenuHead>
                <StoreMenuUl>


                    <StoreMenuLink to="/store/category/KOREAN">
                        <StoreMenuLi>
                            <StoreMenuImgType src={menu5} alt="한식 음식 이미지" />
                            <StoreMenuLink to="/store/category/KOREAN">한식</StoreMenuLink>
                            <StoreMenuTextTpye>#든든한 한끼 #밥심</StoreMenuTextTpye>
                        </StoreMenuLi>
                    </StoreMenuLink>

                    <StoreMenuLink to="/store/category/JAPANESE">
                        <StoreMenuLi>
                            <StoreMenuImgType src={menu6} alt="일식 음식 이미지" />
                            <StoreMenuLink to="/store/category/JAPANESE">일식</StoreMenuLink>
                            <StoreMenuTextTpye>#데이트 #초밥</StoreMenuTextTpye>
                        </StoreMenuLi>
                    </StoreMenuLink>

                    <StoreMenuLink to="/store/category/CHINESE">
                        <StoreMenuLi>
                            <StoreMenuImgType src={menu4} alt="중식 음식 이미지" />
                            <StoreMenuLink to="/store/category/CHINESE">중식</StoreMenuLink>
                            <StoreMenuTextTpye>#짜장면 #탕수육은 찍먹</StoreMenuTextTpye>
                        </StoreMenuLi>
                    </StoreMenuLink>

                    <StoreMenuLink to="/store/category/NIGHT">
                        <StoreMenuLi>
                            <StoreMenuImgType src={menu3} alt="야식 음식 이미지" />
                            <StoreMenuLink to="/store/category/NIGHT">야식</StoreMenuLink>
                            <StoreMenuTextTpye>#맛있으면 0칼로리</StoreMenuTextTpye>
                        </StoreMenuLi>
                    </StoreMenuLink>

                    <StoreMenuLink to="/store/category/CHICKEN">
                        <StoreMenuLi>
                            <StoreMenuImgType src={menu1} alt="치킨 음식 이미지" />
                            <StoreMenuLink to="/store/category/CHICKEN">치킨</StoreMenuLink>
                            <StoreMenuTextTpye>#1인1닭 가능 #후라이드</StoreMenuTextTpye>
                        </StoreMenuLi>
                    </StoreMenuLink>

                    <StoreMenuLink to="/store/category/PIZZA">
                        <StoreMenuLi>
                            <StoreMenuImgType src={menu2} alt="피자 음식 이미지" />
                            <StoreMenuLink to="/store/category/PIZZA">피자</StoreMenuLink>
                            <StoreMenuTextTpye>#피자는 역시 #치즈 듬뿍</StoreMenuTextTpye>
                        </StoreMenuLi>
                    </StoreMenuLink>

                </StoreMenuUl>
            </StoreMenu>
        </>
    );
};

export default StyledMenuBar;