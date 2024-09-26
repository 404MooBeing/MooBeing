package com.im.moobeing.domain.deal.dto.response;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class DealDateResponse {
	private LocalDate date;
	private Long totalSpend;
	private List<DealHistoryResponse> history;

	public static DealDateResponse of(LocalDate date, Long totalSpend, List<DealHistoryResponse> history) {
		return new DealDateResponse(date, totalSpend, history);
	}

	public void setTotalSpend(long totalSpend) {
		this.totalSpend = totalSpend;
	}
}
