package com.im.moobeing.domain.loan.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetAllYearLoanMapDto {
	private int year;
	private Long loanBalance;

	public static GetAllYearLoanMapDto of(int year, Long loanBalance) {
		return GetAllYearLoanMapDto.builder()
			.year(year)
			.loanBalance(loanBalance)
			.build();
	}
}
