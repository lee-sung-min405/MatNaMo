package com.cap.controller;

/*
* 가게 카테고리별 목록 페이지 /store/category?category={category}
* 가게 상세 페이지 /store/{storeId}
*/

import com.cap.domain.delivery.Menu;
import com.cap.domain.delivery.Store;
import com.cap.domain.delivery.StoreRole;
import com.cap.repository.MenuRepository;
import com.cap.repository.StoreRepository;
import com.cap.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/store")
public class StoreController {

    @Autowired private StoreService storeService;
    @Autowired private StoreRepository storeRepository;
    @Autowired private MenuRepository menuRepository;

    //  가게 카테고리 별 페이지
    @GetMapping("/category")
    public List<Store> getStoresByCategory(
            @RequestParam("category") StoreRole category,
            @RequestParam(name = "search", required = false) String search) {
        List<Store> storesByCategory = storeService.getStoresByCategory(category);

        if (search != null && !search.isEmpty()) {
            // 검색어가 제공된 경우, 검색 결과를 필터링
            List<Store> filteredStores = new ArrayList<>();
            for (Store store : storesByCategory) {
                if (store.getSname().contains(search)) {
                    filteredStores.add(store);
                }
            }
            return filteredStores;
        } else {
            // 검색어가 없는 경우, 해당 카테고리의 모든 가게 반환
            return storesByCategory;
        }
    }


    // 가게 상세 페이지 - 가게 정보 + 메뉴
    @GetMapping("/{storeId}")
    public List<Menu> getMenusByStore(@PathVariable Long storeId){
        // 해당 가게의 모든 메뉴 가져오기
        List<Menu> menus = menuRepository.findByStoreStoreId(storeId);

        return menus;
    }

    //  주문표 처리
    // TODO : 주문 db 생성 -> 가게 id, 사용자 id,  주문내역, 주문 상태 주문 시간
    // TODO : 주문내역 db -> 주문내역 id, 메뉴 id 주문 id  수량, 총가격
}
