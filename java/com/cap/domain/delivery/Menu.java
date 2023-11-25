package com.cap.domain.delivery;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/* 메뉴 DB
* 가게 아이디 외래키 설정
* 메뉴 아이디, 메뉴 이름, 가격, 메뉴 소개
*/
@Getter //  get 함수를 일괄적으로 만듦
@Setter
@NoArgsConstructor  //  기본 생성자 만들어 줌
@Entity //  DB 테이블 역할
public class Menu {
    @Id() //  primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuId;  //  메뉴 id

    @JoinColumn(name = "storeId")    //  외래키 storeId 관련을 맺음
    @ManyToOne(optional = false)    //  다대일 관계
    // 하나의 음식점이 여러개의 메뉴를 가지고 있음 
    private Store store; // 가게 아이디

    @Column(nullable = false, length = 50)
    private String Mname;   //  메뉴 이름

    private Long Mmoney; //  가격

    @Column(length = 65535)
    private String Mintro;  //  메뉴 소개

    @Column(length = 65535)
    private String Mimage;  //  메뉴 사진

    @Builder
    public Menu(Long menuId, Store store, String Mname,
                Long Mmoney, String Mintro, String Mimage){
        this.menuId = menuId;
        this.store = store;
        this.Mname = Mname;
        this.Mmoney = Mmoney;
        this.Mintro = Mintro;
        this.Mimage = Mimage;
    }
}
