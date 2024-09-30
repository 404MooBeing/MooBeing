package com.im.moobeing.domain.radish.dto.response;

import com.im.moobeing.domain.radish.entity.RadishCapsule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
public class RadishCapsuleResponse {
    private Long id;
    private String date;
    private String title;
    private String amount;
    private String imageUrl;
    private String iconUrl;
    private String content;

    public static RadishCapsuleResponse of(RadishCapsule capsule) {
        return RadishCapsuleResponse.builder()
                .id(capsule.getId())
                .date(formatDate(capsule.getCreateAt().toLocalDate()))
                .title(capsule.getDeal().getTitle())
                .amount(formatAmount(capsule.getDeal().getPrice()))
                .imageUrl(capsule.getImgUrl())
                .iconUrl(capsule.getCharacter().getRadishImageUrl())
                .content(capsule.getDescription())
                .build();
    }
    private static String formatDate(LocalDate date) {
        return String.format("%d월 %d일", date.getMonthValue(), date.getDayOfMonth());
    }

    private static String formatAmount(Long amount) {
        return String.format("%,d", amount);
    }
}
