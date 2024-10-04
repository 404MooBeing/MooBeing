package com.im.moobeing.domain.deal.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CategoryPercentDto {
    private String label;
    private Double percent;

    public static CategoryPercentDto of(String label, Double percent) {
        return CategoryPercentDto.builder()
                                 .label(label)
                                 .percent(percent)
                                 .build();
    }
}
