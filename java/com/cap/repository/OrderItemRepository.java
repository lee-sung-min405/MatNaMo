package com.cap.repository;

import com.cap.domain.delivery.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByGroupOrderId(Long groupOrderId);
}
