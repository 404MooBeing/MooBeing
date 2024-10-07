package com.im.moobeing.domain.point.dto.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

public record PointTransactionHistoryRequest (
        @Schema(description = "조회할 기간 (1개월, 3개월, 6개월, 1년 중 하나)", example = "3개월") Integer months,
        @Schema(description = "거래 유형 (전체, 입금, 출금 중 하나)", example = "전체") String transactionType,
        @Schema(description = "페이지 번호", example = "1") int page
) {

    @JsonCreator
    public PointTransactionHistoryRequest(
            @JsonProperty("months") String months,
            @JsonProperty("transactionType") String transactionType,
            @JsonProperty("page") int page) {
        this(convertMonths(months), convertTransactionType(transactionType), page);
    }

    private static Integer convertMonths(String months) {
        return switch (months) {
            case "1개월" -> 1;
            case "3개월" -> 3;
            case "6개월" -> 6;
            case "1년" -> 12;
            default -> throw new IllegalArgumentException("유효하지 않은 기간입니다: " + months);
        };
    }

    private static String convertTransactionType(String transactionType) {
        return switch (transactionType.toLowerCase()) {
            case "전체" -> "all";
            case "입금" -> "deposit";
            case "출금" -> "withdrawal";
            default -> throw new IllegalArgumentException("유효하지 않은 거래 유형입니다: " + transactionType);
        };
    }
}