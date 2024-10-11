package com.im.moobeing.domain.deal.dto.response;

import lombok.Builder;

@Builder
public record AccountSummaryResponse(
        Long id,
        String bankImage,
        String accountName,
        Long totalSpend
) {
}
