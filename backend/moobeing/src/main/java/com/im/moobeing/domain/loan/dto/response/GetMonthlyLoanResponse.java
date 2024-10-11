package com.im.moobeing.domain.loan.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetMonthlyLoanResponse {
	private Long monthlyLoanAmount;

	public static GetMonthlyLoanResponse of(Long monthlyLoanAmount) {
		return GetMonthlyLoanResponse.builder()
			.monthlyLoanAmount(monthlyLoanAmount)
			.build();
	}
}
