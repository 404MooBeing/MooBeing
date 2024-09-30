package com.im.moobeing.domain.deal.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record TransactionHistoryRequest(
        @Schema(description = "조회할 계좌 ID", example = "1") Long accountId,
        @Schema(description = "조회할 기간(개월 수)", example = "3") Integer months,
        @Schema(description = "거래 유형 (전체: 'all', 입금: 'deposit', 출금: 'withdrawal')", example = "all") String transactionType,
        @Schema(description = "페이지 번호", example = "1") int page
) {
}
