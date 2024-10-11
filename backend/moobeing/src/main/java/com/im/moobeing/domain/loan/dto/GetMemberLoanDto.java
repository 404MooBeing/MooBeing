package com.im.moobeing.domain.loan.dto;

import com.im.moobeing.domain.loan.entity.LoanProduct;
import com.im.moobeing.domain.loan.entity.MemberLoan;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetMemberLoanDto {
	private String loanProductName;
	private String bankImageUrl;
	private Long remainingBalance;
	private Double interestRate;

	public static GetMemberLoanDto of(MemberLoan memberLoan, LoanProduct loanProduct, Boolean goodMember) {
		Double sail = (double) 0;
		if (goodMember){
			sail = 0.1;
		}
		return GetMemberLoanDto.builder()
			.loanProductName(memberLoan.getLoanProductName())
			.bankImageUrl(loanProduct.getBankImageUrl())
			.remainingBalance(memberLoan.getRemainingBalance())
			.interestRate(loanProduct.getInterestRate() - sail)
			.build();
	}
}
