package com.im.moobeing.domain.deal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CategoryPercentDto {
    private String label;
    private Integer percent;

    public static CategoryPercentDto of(String label, Integer percent) {
        return CategoryPercentDto.builder()
                                 .label(label)
                                 .percent(percent)
                                 .build();
    }
}
