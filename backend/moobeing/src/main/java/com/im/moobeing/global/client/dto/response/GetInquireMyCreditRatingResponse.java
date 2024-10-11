package com.im.moobeing.global.client.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GetInquireMyCreditRatingResponse {
    @JsonProperty("REC")  // JSON으로 직렬화될 때 "REC"로 이름이 설정됩니다.
    private REC rec;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class REC {
        private String ratingName;
        private String demandDepositAssetValue;
        private String depositSavingsAssetValue;
        private String totalAssetValue;
    }
}
