package com.im.moobeing.domain.account.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GetCreateDemandDepositAccountResponse {
    private Header Header;
    @JsonProperty("REC")  // JSON으로 직렬화될 때 "REC"로 이름이 설정됩니다.
    private REC rec;
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Header {
        private String responseCode;
        private String responseMessage;
        private String apiName;
        private String transmissionDate;
        private String transmissionTime;
        private String institutionCode;
        private String apiKey;
        private String apiServiceCode;
        private String institutionTransactionUniqueNo;
    }
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class REC {
        private String bankCode;
        private String accountNo;
        private Currency currency;
        @Getter
        @NoArgsConstructor
        @AllArgsConstructor
        @ToString
        public static class Currency {
            private String currency;
            private String currencyName;
        }
    }
}