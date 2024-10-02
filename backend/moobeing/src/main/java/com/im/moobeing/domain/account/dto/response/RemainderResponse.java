package com.im.moobeing.domain.account.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RemainderResponse {
    private Long remainder;

    public static RemainderResponse of(Long remainder) {
        return RemainderResponse.builder()
                .remainder(remainder)
                .build();
    }
}
