package com.im.moobeing.domain.loan.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetDetailLoanResponse {
    private Long remainingBalance;
    private Long monthBalance;

    public static GetDetailLoanResponse of(Long remainingBalance, Long monthBalance){
        return GetDetailLoanResponse.builder()
                .remainingBalance(remainingBalance)
                .monthBalance(monthBalance)
                .build();
    }
}
