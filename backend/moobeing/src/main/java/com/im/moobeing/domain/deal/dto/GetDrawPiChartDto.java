package com.im.moobeing.domain.deal.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetDrawPiChartDto {
	private String id;
	private String label;
	private long value;
	private String color;

	public static GetDrawPiChartDto of(String id, String label, long value, String color) {
		return GetDrawPiChartDto.builder()
			.id(id)
			.label(label)
			.value(value)
			.color(color)
			.build();
	}
}
