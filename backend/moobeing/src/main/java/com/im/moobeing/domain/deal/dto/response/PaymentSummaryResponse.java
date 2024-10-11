package com.im.moobeing.domain.deal.dto.response;

public record PaymentSummaryResponse(
        Long monthlyPaymentAmount,
        String compareText,
        Boolean isMorePaid
) {
}
