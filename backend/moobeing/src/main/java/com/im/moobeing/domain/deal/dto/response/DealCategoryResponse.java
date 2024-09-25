package com.im.moobeing.domain.deal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class DealCategoryResponse {
	private String categoryName;
	private long totalPrice;
}
