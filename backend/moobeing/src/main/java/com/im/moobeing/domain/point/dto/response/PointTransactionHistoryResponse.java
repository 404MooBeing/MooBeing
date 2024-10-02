package com.im.moobeing.domain.point.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record PointTransactionHistoryResponse(
        @Schema(description = "거래 날짜", example = "2024.09.20 (금)") String date,
        @Schema(description = "거래 시간", example = "10:55") String time,
        @Schema(description = "거래 금액", example = "-4800") Long amount,
        @Schema(description = "잔액", example = "995,200") Long remainBalance
) {
}
