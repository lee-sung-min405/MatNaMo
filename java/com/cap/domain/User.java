package com.cap.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * 회원 정보 DB
 * 아이디(학번), 이름, 학과, 비밀 번호, 전화 번호, 도로명 주소, 상세 주소, 프로필 사진
 */

@Getter //  get 함수를 일괄적으로 만듦
@Setter
@NoArgsConstructor  //  기본 생성자 만들어 줌
@Entity //  DB 테이블 역할
public class User {
    @Id //  primary key
    @Column(nullable = false, length = 50, unique = true)   //  반드시 값을 가져야할 때 사용
    private String userId;  //  아이디(학번)

    @Column(nullable = false, length = 50)
    private String username;    //  이름

    @Column(nullable = false, length = 50)
    private String department;  //  학과

    @Column(nullable = false, length = 20)
    private String password;    //  비밀 번호

    @Column(nullable = false, length = 20, unique = true)
    private String phone;   //  전화 번호

    @Column(nullable = false, length = 50)
    private String address; //  도로명 주소

    @Column(length = 50)
    private String detailsAddress; //  상세 주소

    @Enumerated(EnumType.STRING)    //  열거형 타입을 문자열로 저장
    @Column(nullable = false, length = 20)
    private UserRole role = UserRole.USER;;  //  권한 확인

    @Builder
    public User(String userId, String username, String department, String password, String phone, UserRole role) {
        this.userId = userId;
        this.username = username;
        this.department = department;
        this.password = password;
        this.phone = phone;
        this.role = role;
    }


}
