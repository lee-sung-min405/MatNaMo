package com.cap.domain.delivery;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/* 가게 DB
 *   가게Id, 가게명, 주소, 전화번호, 소개글, 평점, 가게 사진
 *   음식카테고리(한,중,일식,치킨,피자 등), 최소주문금액, 배달 예상 시간
 *   영업 시간, 휴무일, 배달지역
 */

@Getter //  get 함수를 일괄적으로 만듦
@Setter
@NoArgsConstructor  //  기본 생성자 만들어 줌
@Entity //  DB 테이블 역할
public class Store {
    @Id() //  primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeId;  //  가게 id

    @Column(nullable = false, length = 50)
    private String Sname;   //  가게 이름

    @Column(nullable = false, length = 50)
    private String Saddress;    //  가게 주소

    @Column(nullable = false, length = 20)
    private String Sgrade;  //  평점

    @Column(nullable = false, length = 20)
    private String Sreview; //  리뷰수

    private Long SorderMinimum; //  최소 주문 금액

    private Long Stip; //  배달요금


    @Column(length = 50)
    private String Sphone;   //  전화번호

    @Column(nullable = false, length = 50)
    private String Sopen; // 영업 시간

    @Column(nullable = false, length = 50)
    private String Stime; // 배달 예상 시간

    @Enumerated(EnumType.STRING)    //  열거형 타입을 문자열로 저장
    @Column(nullable = false, length = 20)
    private StoreRole store;  //  음식 카테고리

    @Column(length = 65535)
    private String Simage;  //  가게 사진

    @Builder
    public Store(Long storeId, String Sname, String Saddress,
                 String Sgrade, Long SorderMinimum, String Stime,
                 String Sopen, StoreRole store, Long Stip,
                 String Sreview, String Sphone, String Simage) {
        this.storeId = storeId;
        this.Sname = Sname;
        this.Saddress = Saddress;
        this.Sgrade = Sgrade;
        this.SorderMinimum = SorderMinimum;
        this.Stime = Stime;
        this.Stip = Stip;
        this.Sreview = Sreview;
        this.Sopen = Sopen;
        this.store =store;
        this.Sphone = Sphone;
        this.Simage = Simage;
    }


}
