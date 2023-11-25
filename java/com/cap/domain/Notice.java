package com.cap.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

/*
 * 공지사항 DB
 * 공지사항Id, 아이디, 제목, 본문, 날짜
 */

@Getter //  get 함수를 일괄적으로 만듦
@Setter
@NoArgsConstructor  //  기본 생성자 만들어 줌
@Entity //  DB 테이블 역할
public class Notice {

    @Id() //  primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  //  게시글 id

    @Setter
    @JoinColumn(name = "userId")    //  외래키 userId와 관련을 맺음
    @ManyToOne(optional = false)    //  다대일 관계
    //  각 게시글은 하나의 사용자에 의해 작성되지만, 하나의 사용자는 여러 개의 게시글을 작성할 수 있다.
    private User user; // 아이디


    @Column(nullable = false, length = 255)
    private String title;    //  제목


    @Column(nullable = false, length = 65535)
    private String content;  //  본문


    @Column(nullable = false)
    private Timestamp createdAt; // 작성일


    @Builder
    public Notice(Long id, User user, String title, String content, Timestamp createdAt) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}
