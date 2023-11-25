package com.cap.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

/*
 * 게시글 DB
 * 게시글Id, 아이디(학번), 제목, 본문, 날짜
 */

@Getter //  get 함수를 일괄적으로 만듦
@Setter
@NoArgsConstructor  //  기본 생성자 만들어 줌
@Entity //  DB 테이블 역할
public class Article {

    @Id() //  primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  //  게시글 id

    @Setter
    @JoinColumn(name = "userId")    //  외래키 userId와 관련을 맺음
    @ManyToOne(optional = false)    //  다대일 관계
    //  각 게시글은 하나의 사용자에 의해 작성되지만, 하나의 사용자는 여러 개의 게시글을 작성할 수 있다.
    private User user; // 아이디(학번)

    @Column(length = 500)
    private String orderLink; // 주문 링크

    @Column(nullable = false, length = 255)
    private String title;    //  제목


    @Column(nullable = false, length = 65535)
    private String content;  //  본문


    @Column(nullable = false)
    private Timestamp createdAt; // 작성일

    private String address; //  현 위치 (그룹 주문 시 음식을 먹을 위치 설정할 수 있음)

    @Builder
    public Article(Long id, User user, String title, String content, Timestamp createdAt, String orderLink, String address) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.orderLink = orderLink;
        this.address = address;
    }
}
