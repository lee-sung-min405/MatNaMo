// src/components/Home.js

import React from "react";
import {
    HomeBody
} from "./HomeCss";
import StyledLoginBefore from "./style/Header/StyledLogInBefore";
import StyledHeaderHome from "./style/Header/StyledHeaderHome";
import StyledHeaderBefore from "./style/Header/StyledHeaderBefore";
import StyledStore from "./style/StyledStore";
import StyledFooter from "./style/StyledFooter";
import StyledArrow from "./style/StyledArrow";
import StyledLoginAfter from "./style/Header/StyledLoginAfter";
import StyledHeaderAfter from "./style/Header/StyledHeaderAfter";
import useAuthStatus from "./style/Backend/useAuthStatus";

function Home() {
    const {isAuthenticated } = useAuthStatus();

    return (
        <div>
            {isAuthenticated ? (
                <HomeBody>
                    <StyledLoginAfter/>
                    <StyledHeaderHome/>
                    <StyledHeaderAfter/>
                    <StyledStore/>
                    <StyledArrow/>
                    <StyledFooter/>
                </HomeBody>

            ) : (
                <HomeBody>
                    <StyledLoginBefore/>
                    <StyledHeaderHome/>
                    <StyledHeaderBefore/>
                    <StyledStore/>
                    <StyledArrow/>
                    <StyledFooter/>
                </HomeBody>
            )}
        </div>
    );
}

export default Home;