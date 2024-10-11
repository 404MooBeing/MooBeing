package com.im.moobeing.domain.credit.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreditGetResponse {
    private String ratingName;
    private int ratingPercent;

    public static CreditGetResponse of(String ratingName, int ratingPercent) {
        return CreditGetResponse.builder()
                .ratingName(ratingName)
                .ratingPercent(ratingPercent)
                .build();
    }
}
