package com.im.moobeing.domain.account.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.im.moobeing.global.config.ApiKeyConfig;
import com.im.moobeing.global.util.RequestHeaderUtil;
import lombok.Getter;

@Getter
public class GetCreateDemandDepositAccountRequest {
    @JsonProperty("Header")
    private final Header header;
    private final String accountTypeUniqueNo;
    public GetCreateDemandDepositAccountRequest(ApiKeyConfig apiKeyConfig, String userKey, String productCode) {
        this.header = RequestHeaderUtil.createHeader(GetCreateDemandDepositAccountRequest.Header.class, this.getClass(), apiKeyConfig, userKey);
        this.accountTypeUniqueNo = productCode;
    }
    public record Header(String apiName, String transmissionDate, String transmissionTime, String institutionCode,
                         String fintechAppNo, String apiServiceCode, String institutionTransactionUniqueNo,
                         String apiKey, String userKey) {
    }
}