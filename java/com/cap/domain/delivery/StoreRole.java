package com.cap.domain.delivery;

import lombok.AllArgsConstructor;
import lombok.Getter;

/* 음식 카테고리
* 한식, 일식, 중식, 야식, 치킨, 피자로 가게
* 구별
*/
@AllArgsConstructor
@Getter
public enum StoreRole {

    KOREAN("ROLE_KOREAN"),
    JAPANESE("ROLE_JAPANESE"),
    CHINESE("ROLE_CHINESE"),
    NIGHT("ROLE_NIGHT"),
    PIZZA("ROLE_PIZZA"),
    CHICKEN("ROLE_CHICKEN");

    private String roleStore;
}
