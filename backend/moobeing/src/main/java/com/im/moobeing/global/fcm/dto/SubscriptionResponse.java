package com.im.moobeing.global.fcm.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class SubscriptionResponse {

    private String token;
    private LocalDateTime lastUpdated;

    public SubscriptionResponse(String token, LocalDateTime lastUpdated) {
        this.token = token;
        this.lastUpdated = lastUpdated;
    }
}
