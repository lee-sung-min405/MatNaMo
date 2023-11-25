package com.cap.repository;

import com.cap.domain.delivery.Store;
import com.cap.domain.delivery.StoreRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {
    List<Store> findByStore(StoreRole category);    //  카테고리 별 음식점 리스트
}
