package com.im.moobeing.domain.account.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TransferRequest {
    String fromAccount;
    String toAccount;
    Long balance;
    String depositTransactionSummary;
    String withdrawalTransactionSummary;
}