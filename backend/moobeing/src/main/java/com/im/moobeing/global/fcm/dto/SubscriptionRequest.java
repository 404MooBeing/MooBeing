package com.im.moobeing.global.fcm.dto;

import lombok.Data;

@Data
public class SubscriptionRequest {

    private String token;

    public SubscriptionRequest(String token) {
        this.token = token;
    }
}
