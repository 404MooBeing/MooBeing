package com.im.moobeing.domain.deal.dto.response;

import com.im.moobeing.domain.deal.entity.Deal;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public record TransactionHistoryResponse(
        @Schema(description = "거래 번호", example = "1") Long id,
        @Schema(description = "거래 일자", example = "2024.09.20 (금)") String date,
        @Schema(description = "거래 제목", example = "스타벅스") String title,
        @Schema(description = "거래 시간", example = "10:55") String time,
        @Schema(description = "거래 금액", example = "-4800") Long amount,
        @Schema(description = "잔액", example = "995,200") String remainBalance
) {

    public static TransactionHistoryResponse of(Deal deal) {
        return new TransactionHistoryResponse(
                deal.getDealId(),
                formatDate(deal.getCreatedDate()),
                deal.getTitle(),
                formatTime(deal.getCreatedDate()),
                deal.getPrice(),
                formatRemainBalance(deal.getRemainBalance())
        );
    }

    private static String formatDate(LocalDateTime dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd (E)", Locale.KOREAN);
        return dateTime.format(formatter);
    }

    private static String formatTime(LocalDateTime dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        return dateTime.format(formatter);
    }

    private static String formatRemainBalance(Long remainBalance) {
        return String.format("%,d", remainBalance);
    }
}
