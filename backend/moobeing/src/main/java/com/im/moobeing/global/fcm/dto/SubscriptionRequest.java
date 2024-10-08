package com.im.moobeing.global.fcm.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SubscriptionRequest {

    private String token;
}
