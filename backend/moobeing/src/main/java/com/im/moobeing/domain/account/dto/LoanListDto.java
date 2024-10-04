package com.im.moobeing.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoanListDto {
    private String loanName;
    private Long interestBalance;
    private Long loanBalance;

    public static LoanListDto of(String LoanName, Long InterestBalance, Long loanBalance) {
        return LoanListDto.builder()
                .loanName(LoanName)
                .interestBalance(InterestBalance)
                .loanBalance(loanBalance)
                .build();
    }
}
