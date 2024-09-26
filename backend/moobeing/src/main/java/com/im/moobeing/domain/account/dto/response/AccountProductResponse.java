package com.im.moobeing.domain.account.dto.response;

import com.im.moobeing.domain.account.entity.AccountProduct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AccountProductResponse {
    private Long id;
    private String bankCode;
    private String bankName;
    private String accountName;
    private String accountDescription;
    public static AccountProductResponse of(AccountProduct accountProduct, String bankName) {
        return AccountProductResponse.builder()
                .id(accountProduct.getId())
                .bankCode(accountProduct.getBankCode())
                .bankName(bankName)
                .accountName(accountProduct.getAccountName())
                .accountDescription(accountProduct.getAccountDescription())
                .build();
    }
}