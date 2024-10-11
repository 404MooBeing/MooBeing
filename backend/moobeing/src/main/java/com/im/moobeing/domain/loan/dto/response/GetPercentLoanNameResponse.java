package com.im.moobeing.domain.loan.dto.response;

public record GetPercentLoanNameResponse(
        String loanName,
        Double remainingPercent
) {
}
