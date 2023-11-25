package com.cap.controller;

import com.cap.domain.Article;
import com.cap.domain.delivery.GroupOrder;
import com.cap.domain.User;
import com.cap.domain.delivery.Menu;
import com.cap.domain.delivery.OrderItem;
import com.cap.domain.delivery.Store;
import com.cap.dto.OrderItemDto;
import com.cap.dto.StoreDto;
import com.cap.repository.GroupOrderRepository;
import com.cap.repository.MenuRepository;
import com.cap.repository.OrderItemRepository;
import com.cap.repository.StoreRepository;
import com.cap.service.GroupOrderService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/order")
public class GroupOrderController {

    @Autowired private GroupOrderService groupOrderService;
    @Autowired private GroupOrderRepository groupOrderRepository;
    @Autowired private StoreRepository storeRepository;
    @Autowired private MenuRepository menuRepository;
    @Autowired private OrderItemRepository orderItemRepository;


    // 'storeId'를 경로 변수로 사용하여 그룹 주문 링크를 생성합니다.
    //  그룹 주문 링크 생성한 사용자 -> 호스트
    @PostMapping("/create-group-order/{storeId}")
    public ResponseEntity<String> createGroupOrderLink(@PathVariable Long storeId, HttpSession session) {
        try {
            // 그룹 주문 링크 생성
            String groupOrderLink = groupOrderService.generateGroupOrderLink(storeId);

            // 그룹 주문 엔티티 생성
            GroupOrder groupOrder = new GroupOrder();

            // 현재 로그인한 사용자 정보 가져오기
            User loggedInUser = (User) session.getAttribute("user"); // 현재 로그인한 사용자 정보를 가져옴
            if (loggedInUser == null) {
                return ResponseEntity.badRequest().body("로그인한 사용자 정보를 가져올 수 없습니다.");
            }

            // 가게 정보 가져오기
            Store store = storeRepository.findById(storeId).orElse(null);
            if (store == null) {
                return ResponseEntity.badRequest().body("해당 가게 정보를 찾을 수 없습니다.");
            }

            groupOrder.setOrganizer(loggedInUser);  // 사용자 정보를 이용하여 그룹 주문의 호스트로 설정
            groupOrder.setStore(store); // 가게 정보 저장
            groupOrder.setGroupOrderLink(groupOrderLink);

            // 여기서 최대 참가자 수를 설정합니다. - 이 부분을 추가합니다.
            groupOrder.setMaxParticipants(4);


            // 그룹 주문 엔티티를 저장합니다.
            groupOrderRepository.save(groupOrder);

            // 생성된 그룹 주문 링크 반환
            return ResponseEntity.ok(groupOrderLink);
        } catch (Exception e) {
            // 오류 처리 로직을 적절히 구현
            return ResponseEntity.badRequest().body("그룹 주문 링크 생성에 실패했습니다.");
        }
    }


    //  그룹주문 참가자 저장 처리
    // 게시판에 있는 그룹주문 링크 클릭 -> 게시글에 저장된 링크 주소와 groupOrder.groupOrderLink가 동일한지 확인
    //        -> 동일 하다면 해당 링크 주소의 그룹 아이디 가져옴
    // 링크를 통한 그룹 주문 참가 처리
    @PostMapping("/join")
    public ResponseEntity<?> joinGroupOrder(@RequestBody Map<String, String> payload, HttpSession session) {
        String orderLink = payload.get("orderLink");
        GroupOrder groupOrder = groupOrderService.findByGroupOrderLink(orderLink);

        // 현재 로그인한 사용자 정보 가져오기
        User loggedInUser = (User) session.getAttribute("user"); // 현재 로그인한 사용자 정보를 가져옴
        if (loggedInUser == null) {
            return ResponseEntity.badRequest().body("로그인한 사용자 정보를 가져올 수 없습니다.");
        }

        if (groupOrder != null) {
            // addParticipant 메소드를 호출하여 참가자를 추가하려고 시도
            if (groupOrder.addParticipant(loggedInUser)) {
                groupOrderRepository.save(groupOrder);
                return ResponseEntity.ok("그룹 주문에 성공적으로 참가하였습니다.");
            } else {
                // 참가자 수가 최대에 도달했을 경우
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("참가자 수가 최대를 초과했습니다.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 링크의 그룹 주문을 찾을 수 없습니다.");
        }
    }

    //  groupOrderId를 얻어오는 처리
    @GetMapping("/get-group-order-id")
    public ResponseEntity<?> getGroupOrderId(@RequestParam String groupOrderLink) {
        try {
            GroupOrder groupOrder = groupOrderService.findByGroupOrderLink(groupOrderLink);
            Long groupOrderId = groupOrder.getId(); // GroupOrder 객체에서 ID를 가져옵니다.
            return ResponseEntity.ok(groupOrderId);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    //  주문표에 메뉴 추가 처리
    // 메뉴 아이템 추가 요청 처리
    @PostMapping("/add-item/{groupOrderId}")
    public ResponseEntity<?> addItemToGroupOrder(@PathVariable Long groupOrderId,
                                                 @RequestBody OrderItemDto orderItemDto,
                                                 HttpSession session) {
        try {
            // 현재 로그인한 사용자 정보 확인
            User loggedInUser = (User) session.getAttribute("user");
            if (loggedInUser == null) {
                return ResponseEntity.badRequest().body("로그인한 사용자 정보를 가져올 수 없습니다.");
            }

            // 해당 그룹 주문 찾기
            GroupOrder groupOrder = groupOrderRepository.findById(groupOrderId).orElse(null);
            if (groupOrder == null) {
                return ResponseEntity.badRequest().body("해당 그룹 주문을 찾을 수 없습니다.");
            }

            // OrderItem 객체 생성 및 설정
            OrderItem orderItem = new OrderItem();
            orderItem.setUser(loggedInUser);
            orderItem.setMenu(menuRepository.findById(orderItemDto.getMenuId()).orElse(null));
            orderItem.setQuantity(orderItemDto.getQuantity());
            orderItem.setGroupOrder(groupOrder);

            // OrderItem 저장
            orderItemRepository.save(orderItem);


            return ResponseEntity.ok("메뉴 아이템이 그룹 주문에 추가되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("메뉴 아이템 추가에 실패했습니다.");
        }
    }

    // 주문 목록 불러오는 처리
    @GetMapping("/items/{groupOrderId}")
    public ResponseEntity<List<OrderItemDto>> getOrderItemsByGroupOrderId(@PathVariable Long groupOrderId) {
        List<OrderItem> orderItems = orderItemRepository.findByGroupOrderId(groupOrderId);
        if (orderItems.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<OrderItemDto> orderItemDtos = orderItems.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(orderItemDtos);
    }

    private OrderItemDto convertToDto(OrderItem orderItem) {
        // 메뉴 이름과 가격 정보를 포함하여 DTO 생성
        OrderItemDto dto = new OrderItemDto();
        User user = orderItem.getUser();
        Menu menu = orderItem.getMenu();

        if (user != null && menu != null) {
            dto.setUserId(user.getUserId());
            dto.setUsername(user.getUsername());
        }
        if (menu != null) {
            dto.setMenuId(menu.getMenuId());
            dto.setMname(menu.getMname());
            dto.setMmoney(menu.getMmoney());
            dto.setMimage(menu.getMimage());
        }

        // orderItem에서 수량을 가져와 DTO에 설정
        dto.setQuantity(orderItem.getQuantity());

        return dto;
    }

    // 특정 그룹 주문의 호스트인지 확인하는 엔드포인트
    @GetMapping("/is-organizer/{groupOrderId}")
    public ResponseEntity<Boolean> isUserOrganizer(@PathVariable Long groupOrderId, HttpSession session) {
        // 현재 로그인한 사용자 정보 가져오기
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }

        // 해당 그룹 주문 가져오기
        GroupOrder groupOrder = groupOrderRepository.findById(groupOrderId)
                .orElseThrow(() -> new EntityNotFoundException("그룹 주문을 찾을 수 없습니다."));

        // 현재 로그인한 사용자가 호스트인지 확인
        boolean isOrganizer = groupOrder.getOrganizer().getUserId().equals(loggedInUser.getUserId());

        return ResponseEntity.ok(isOrganizer);
    }

    // 배달지 + 요청사항 추가 처리
    @PostMapping("/{groupOrderId}/update")
    public ResponseEntity<String> updateGroupOrder(
            @PathVariable Long groupOrderId,
            @RequestBody GroupOrder groupOrder,
            HttpSession session
    ) {
        // 그룹주문 ID를 사용하여 해당 그룹주문을 찾음
        GroupOrder existingGroupOrder = groupOrderService.getGroupOrderById(groupOrderId);

        if (existingGroupOrder == null) {
            // 그룹주문을 찾을 수 없는 경우, 에러 응답
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
        }

        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null || !loggedInUser.getUserId().equals(existingGroupOrder.getOrganizer().getUserId())) {
            // 로그인하지 않았거나 그룹주문 호스트가 아닌 경우, 권한 없음 응답
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("게시글을 수정할 권한이 없습니다.");
        }

        // 업데이트된 정보로 기존 그룹주문을 업데이트
        existingGroupOrder.setDeliveryAddress(groupOrder.getDeliveryAddress());
        existingGroupOrder.setDetailAddress(groupOrder.getDetailAddress());
        existingGroupOrder.setSpecialInstructions(groupOrder.getSpecialInstructions());

        // 데이터베이스에 변경 사항을 저장
        groupOrderService.createGroupOrder(existingGroupOrder);

        return ResponseEntity.ok("게시글이 성공적으로 수정되었습니다.");
    }


    // groupOrderId로 해당 주문의 가게 정보를 조회하는 엔드포인트
    @GetMapping("/store-info/{groupOrderId}")
    public ResponseEntity<StoreDto> getStoreInfoByGroupOrderId(@PathVariable Long groupOrderId) {
        // groupOrderId를 사용하여 주문 항목을 조회
        List<OrderItem> orderItems = orderItemRepository.findByGroupOrderId(groupOrderId);
        if (orderItems.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 첫 번째 주문 항목의 메뉴에서 가게 정보를 가져옴
        Store store = orderItems.get(0).getMenu().getStore();
        // DTO 변환 로직으로 가게 정보를 Dto로 변환
        StoreDto storeDto = convertToDto(store);
        return ResponseEntity.ok(storeDto);
    }

    private StoreDto convertToDto(Store store) {
        // Store 객체를 StoreDto 객체로 변환하는 로직
        return new StoreDto(
                store.getStoreId(),
                store.getSname(),
                store.getStip(),
                store.getSimage()
        );
    }

}
