package com.cap.repository;

import com.cap.domain.delivery.GroupOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupOrderRepository extends JpaRepository<GroupOrder, Long> {
    Optional<Object> findByGroupOrderLink(String link); // URL을 통해 그룹 오더를 찾는 메서드

}
