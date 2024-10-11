package com.im.moobeing.domain.account.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SendAccountRequest {
	private String accountNum;
	private String loanName;
	private Long money;
}
