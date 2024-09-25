package com.im.moobeing.domain.expense.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class ExpenseCategoryResponse {
	private String categoryName;
	private int totalPrice;
}
