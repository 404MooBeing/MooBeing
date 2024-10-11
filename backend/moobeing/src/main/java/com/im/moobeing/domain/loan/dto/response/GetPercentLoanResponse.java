package com.im.moobeing.domain.loan.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetPercentLoanResponse {
	private Double remainingPercent;

	public static GetPercentLoanResponse of(Double remainingPercent) {
		return GetPercentLoanResponse.builder()
			.remainingPercent(remainingPercent)
			.build();
	}
}
