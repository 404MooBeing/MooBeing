package com.im.moobeing.domain.radish.dto.response;

import com.im.moobeing.domain.radish.entity.RadishCapsule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
public class RadishCapsuleHarvestResponse {
    private Long id;
    private LocalDate date;
    private String title;
    private String amount;
    private String imageUrl;
    private String iconUrl;
    private String content;
    private Long coin;

    public static RadishCapsuleHarvestResponse of(RadishCapsule capsule, Long coin) {
        return RadishCapsuleHarvestResponse.builder()
                .id(capsule.getId())
                .date(capsule.getCreateAt().toLocalDate())
                .title(capsule.getDeal().getTitle())
                .amount(formatAmount(capsule.getDeal().getPrice()))
                .imageUrl(capsule.getImgUrl())
                .iconUrl(capsule.getCharacter().getRadishImageUrl())
                .content(capsule.getDescription())
                .coin(coin)
                .build();
    }

    private static String formatAmount(Long amount) {
        return String.format("%,d", amount);
    }
}

