package com.cap.dto;

public class StoreDto {
    private Long storeId;
    private String name;
    private Long deliveryTip;
    private String simage;


    public StoreDto(Long storeId, String name,  Long deliveryTip, String simage) {
        this.storeId = storeId;
        this.name = name;
        this.deliveryTip = deliveryTip;
        this.simage = simage;
    }


    public Long getStoreId() { return storeId; }
    public void setStoreId(Long storeId) { this.storeId = storeId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getDeliveryTip() { return deliveryTip; }
    public void setDeliveryTip(Long deliveryTip) { this.deliveryTip = deliveryTip; }

    public String getSimage() {
        return simage;
    }

    public void setSimage(String simage) {
        this.simage = simage;
    }
}

