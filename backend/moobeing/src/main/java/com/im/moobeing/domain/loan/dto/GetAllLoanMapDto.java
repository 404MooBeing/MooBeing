package com.im.moobeing.domain.loan.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetAllLoanMapDto {
	private int year;
	private int month;
	private Long loanBalance;

	public static GetAllLoanMapDto of(int year, int month, Long loanBalance) {
		return GetAllLoanMapDto.builder()
			.year(year)
			.month(month)
			.loanBalance(loanBalance)
			.build();
	}
}
