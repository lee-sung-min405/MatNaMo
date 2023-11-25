package com.cap.service;

import com.cap.domain.Article;
import com.cap.domain.delivery.GroupOrder;
import com.cap.repository.GroupOrderRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class GroupOrderService {
    @Autowired private GroupOrderRepository groupOrderRepository;

    // 실제 로직에 따라 저장소나 다른 방식을 통해 링크를 생성할 수 있습니다.
    public String generateGroupOrderLink(Long storeId) {
        // 여기서는 단순한 예시로 UUID를 사용해 임의의 링크를 생성합니다.
        return "http://localhost:3000/group-order/" + UUID.randomUUID().toString() + "?storeId=" + storeId;
    }


    public GroupOrder findByGroupOrderLink(String link) {
        return (GroupOrder) groupOrderRepository.findByGroupOrderLink(link)
                .orElseThrow(() -> new EntityNotFoundException("그룹 링크를 찾을 수 없습니다: " + link));
    }

    //  그룹주문 id로 데이터 찾는 서비스
    public GroupOrder getGroupOrderById(Long groupOrderId) {
        Optional<GroupOrder> groupOrderOptional = groupOrderRepository.findById(groupOrderId);

        if (groupOrderOptional.isPresent()) {
            return groupOrderOptional.get();
        } else {
            return null; // 해당 ID에 매칭되는 그룹주문이 없을 경우 null을 반환하거나 예외 처리를 수행할 수 있습니다.
        }
    }

    // 그룹 주문의 배달지 + 요청사항 데이터를 db에 저장하는 서비스
    public void createGroupOrder(GroupOrder groupOrder) {
        groupOrderRepository.save(groupOrder);
    }
}
