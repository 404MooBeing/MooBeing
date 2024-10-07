package com.im.moobeing.domain.deal.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetCategoryListDto {
	private String label;
	private Double percent;
	private long amount;

	public static GetCategoryListDto of(String label, Double percent, long amount) {
		return GetCategoryListDto.builder()
			.label(label)
			.percent(percent)
			.amount(amount)
			.build();
	}

	@Override
	public String toString() {
		return "type : " + label + ", " + "percent : " + percent;
	}
}
