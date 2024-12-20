package com.im.moobeing.global.client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GetUserKeyRequest {
    private String apiKey;
    private String userId;
}