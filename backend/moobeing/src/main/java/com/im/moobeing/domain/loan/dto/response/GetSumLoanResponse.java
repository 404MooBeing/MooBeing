package com.im.moobeing.domain.loan.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetSumLoanResponse {
	private int sumLoanValue;

	public static GetSumLoanResponse of(int sumLoanValue) {
		return GetSumLoanResponse.builder()
			.sumLoanValue(sumLoanValue)
			.build();
	}
}
