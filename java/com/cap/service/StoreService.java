package com.cap.service;

import com.cap.domain.delivery.Menu;
import com.cap.domain.delivery.Store;
import com.cap.domain.delivery.StoreRole;
import com.cap.repository.MenuRepository;
import com.cap.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoreService {
    @Autowired private StoreRepository storeRepository;
    @Autowired private MenuRepository menuRepository;

    public List<Store> getStoresByCategory(StoreRole category) {
        // StoreRepository를 사용하여 해당 카테고리에 해당하는 가게 리스트 가져옴
        return storeRepository.findByStore(category);
    }



}
