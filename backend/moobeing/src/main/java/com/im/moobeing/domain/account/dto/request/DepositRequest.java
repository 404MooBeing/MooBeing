package com.im.moobeing.domain.account.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DepositRequest {
    private String accountNo;
    private Long transactionBalance;
    private String transactionSummary;
}