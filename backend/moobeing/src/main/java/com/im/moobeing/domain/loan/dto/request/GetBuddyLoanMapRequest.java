package com.im.moobeing.domain.loan.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class GetBuddyLoanMapRequest {
	private String loanName;
	private int pageNum;
}
