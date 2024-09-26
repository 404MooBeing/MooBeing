package com.im.moobeing.domain.account.dto;

import com.im.moobeing.domain.account.entity.Account;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetAccountDto {
	private String accountName;
	private String accountNum;
	private Long balance;

	public static GetAccountDto of(Account account) {
		return GetAccountDto.builder()
				.accountNum(account.getAccountNum())
				.accountName(account.getAccountName())
				.balance(account.getAccountBalance())
			.build();
	}
}
