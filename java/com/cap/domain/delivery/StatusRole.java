package com.cap.domain.delivery;

import lombok.AllArgsConstructor;
import lombok.Getter;

// 주문 완료, 배달 중, 배달 완료

@AllArgsConstructor
@Getter
public enum StatusRole {

    ORDER("ROLE_ORDER"),
    DING("ROLE_DING"),
    DEND("ROLE_DEND");

    private String roleStatus;
}
