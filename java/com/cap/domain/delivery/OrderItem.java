package com.cap.domain.delivery;

import com.cap.domain.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 주문 항목 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "groupOrderId")
    private GroupOrder groupOrder; // 해당 주문 항목이 속한 그룹 주문

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menuId")
    private Menu menu; // 메뉴

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;  //  사용자

    private int quantity; // 수량

}
