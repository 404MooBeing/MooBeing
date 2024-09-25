package com.im.moobeing.domain.deal.dto.response;

import com.im.moobeing.domain.deal.entity.Deal;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ExpenseHistoryResponse {
	private String title;
	private String categoryName;
	private Long price;

	public static ExpenseHistoryResponse of(Deal deal) {
		return new ExpenseHistoryResponse(deal.getTitle(), deal.getDealCategory().getName(),
			deal.getPrice());
	}

	public static ExpenseHistoryResponse from(String title, String categoryName, Long price) {
		return new ExpenseHistoryResponse(title, categoryName, price);
	}
}
