package com.cap.domain.delivery;


import com.cap.domain.Article;
import com.cap.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class GroupOrder {


    @Id() //  primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // 그룹주문 id

    @ManyToOne(fetch = FetchType.LAZY)  // 가게와 다대일 관계
    @JoinColumn(name = "storeId")    //  외래키 storeId와 관련을 맺음
    private Store store;    //  가게

    @Column(nullable = false)
    private String groupOrderLink; // 그룹 주문 링크를 저장할 필드

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizerId")
    private User organizer; // 그룹 주문을 생성한 사용자 (호스트)


    @ManyToMany(fetch = FetchType.LAZY) // 참가자와 다대다 관계
    @JoinTable(
            name = "group_order_participants",
            joinColumns = @JoinColumn(name = "group_order_id"),
            inverseJoinColumns = @JoinColumn(name = "userId")
    )
    private Set<User> participants = new HashSet<>(); // 그룹 주문 참가자 목록


    @Column(name = "max_participants")
    public static int maxParticipants = 4; // 최대 참가자 수 설정 (호스트 제외)

    @OneToMany(mappedBy = "groupOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();


    private String deliveryAddress; // 배달지 주소
    private String detailAddress; // 배달지 상세 주소

    private String specialInstructions; // 요청 사항

    //  참가자 추가하는 메서드
    public boolean addParticipant(User user) {
        if (participants.size() < maxParticipants) {
            participants.add(user);
            return true;
        } else {
            return false;
        }
    }

    // 주문 항목 추가 메소드
    public void addOrderItem(OrderItem item) {
        item.setGroupOrder(this);
        this.orderItems.add(item);
    }

    // 주문 항목 제거 메소드
    public void removeOrderItem(OrderItem item) {
        item.setGroupOrder(null);
        this.orderItems.remove(item);
    }
    public GroupOrder(Long id, Store store, String groupOrderLink, User organizer, Set<User> participants,
                      int maxParticipants, String deliveryAddress, String detailAddress, String specialInstructions){
        this.id = id;
        this.store = store;
        this.groupOrderLink = groupOrderLink;
        this.organizer = organizer;
        this.participants = participants != null ? participants : new HashSet<>();
        this.maxParticipants = maxParticipants;
        this.deliveryAddress = deliveryAddress;
        this.detailAddress = detailAddress;
        this.specialInstructions = specialInstructions;
    }


    public void setMaxParticipants(int maxParticipants) {
        this.maxParticipants = maxParticipants;
    }
}
