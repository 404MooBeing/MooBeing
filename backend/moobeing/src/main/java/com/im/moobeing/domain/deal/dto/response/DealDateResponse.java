package com.im.moobeing.domain.deal.dto.response;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ExpenseDateResponse {
	private LocalDate date;
	private Long totalSpend;
	private List<ExpenseHistoryResponse> history;

	public static ExpenseDateResponse of(LocalDate date, Long totalSpend, List<ExpenseHistoryResponse> history) {
		return new ExpenseDateResponse(date, totalSpend, history);
	}

	public void setTotalSpend(long totalSpend) {
		this.totalSpend = totalSpend;
	}
}
