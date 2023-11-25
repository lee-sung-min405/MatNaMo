package com.cap.dto;

public class OrderItemDto {
    private String userId;  //  학번
    private String username;    //  사용자 이름
    private Long menuId; // 메뉴 ID
    private String mname; // 메뉴 이름
    private Long mmoney; // 메뉴 가격
    private int quantity; // 메뉴 수량

    private String mimage; // 메뉴 이미지

    // 기본 생성자
    public OrderItemDto() {
    }

    // 매개변수가 있는 생성자
    public OrderItemDto(String userId, String username, Long menuId, String mname, Long mmoney, int quantity, String mimage) {
        this.userId = userId;
        this.username = username;
        this.menuId = menuId;
        this.mname = mname;
        this.mmoney = mmoney;
        this.quantity = quantity;
        this.mimage = mimage;
    }

    // 게터와 세터
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public Long getMmoney() {
        return mmoney;
    }

    public void setMmoney(Long mmoney) {
        this.mmoney = mmoney;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getMimage() {
        return mimage;
    }

    public void setMimage(String mimage) {
        this.mimage = mimage;
    }

    // toString 메소드 (옵션)
    @Override
    public String toString() {
        return "OrderItemDto{" +
                "userId=" + userId +
                "username=" + username +
                "menuId=" + menuId +
                "mname=" + mname +
                "mmoney=" + mmoney +
                ", quantity=" + quantity +
                "mimage=" + mimage +
                '}';
    }
}
