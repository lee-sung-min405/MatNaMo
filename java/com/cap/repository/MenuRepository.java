package com.cap.repository;

import com.cap.domain.delivery.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByStoreStoreId(Long storeId);
}

