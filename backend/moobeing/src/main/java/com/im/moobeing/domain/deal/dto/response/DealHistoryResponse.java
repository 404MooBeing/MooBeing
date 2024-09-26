package com.im.moobeing.domain.deal.dto.response;

import com.im.moobeing.domain.deal.entity.Deal;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class DealHistoryResponse {
	private String title;
	private String categoryName;
	private Long price;

	public static DealHistoryResponse of(Deal deal) {
		return new DealHistoryResponse(deal.getTitle(), deal.getDealCategory().name(),
			deal.getPrice());
	}

	public static DealHistoryResponse from(String title, String categoryName, Long price) {
		return new DealHistoryResponse(title, categoryName, price);
	}
}
