package com.im.moobeing.global.fcm.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SubscriptionResponse {

    private String token;
    private LocalDateTime lastUpdated;

    public SubscriptionResponse(String token, LocalDateTime lastUpdated) {
        this.token = token;
        this.lastUpdated = lastUpdated;
    }
}
