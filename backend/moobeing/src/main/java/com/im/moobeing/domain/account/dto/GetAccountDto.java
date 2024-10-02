package com.im.moobeing.domain.account.dto;

import com.im.moobeing.domain.account.entity.Account;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetAccountDto {
	private Long id;
	private String accountName;
	private String accountNum;
	private Long remainingBalance;
	private String bankImageUrl;

	public static GetAccountDto of(Account account) {
		return GetAccountDto.builder()
				.id(account.getAccountId())
				.accountNum(account.getAccountNum())
				.accountName(account.getAccountProduct().getAccountName())
				.remainingBalance(account.getAccountBalance())
				.bankImageUrl(account.getAccountProduct().getBankImage())
			.build();
	}
}
