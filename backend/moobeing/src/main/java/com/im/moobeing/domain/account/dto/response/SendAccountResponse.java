package com.im.moobeing.domain.account.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SendAccountResponse {
	private Long accountAmount;

	public static SendAccountResponse of(Long accountAmount) {
		return SendAccountResponse.builder()
			.accountAmount(accountAmount)
			.build();
	}
}
