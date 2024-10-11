package com.im.moobeing.domain.loan.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "MemberLoan")
public class MemberLoan {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_loan_id")
	private Long id;

	@Column(name = "member_id")
	private Long memberId;

	@Column(name = "loan_product_name")
	private String loanProductName;

	@Column(name = "status")
	private String status;

	@Column(name = "initial_balance")
	private Long initialBalance;

	@Column(name = "remaining_balance")
	private Long remainingBalance;

	@Column(name = "withdrawal_account_no")
	private String withdrawalAccountNo;

	@Column(name = "start_year")
	private Integer startYear;

	@Column(name = "start_month")
	private Integer startMonth;

	@Column(name = "start_day")
	private Integer startDay;

	@Column(name = "repayment_deadline")
	private LocalDate repaymentDeadline;

	@Builder
	public MemberLoan(Long id, Long memberId, String loanProductName, String status, Long initialBalance,
		Long remainingBalance, LocalDate repaymentDeadline, String withdrawalAccountNo, Integer startYear,
		Integer startMonth,
		Integer startDay) {
		this.id = id;
		this.memberId = memberId;
		this.loanProductName = loanProductName;
		this.status = status;
		this.initialBalance = initialBalance;
		this.remainingBalance = remainingBalance;
		this.repaymentDeadline = repaymentDeadline;
		this.withdrawalAccountNo = withdrawalAccountNo;
		this.startYear = startYear;
		this.startMonth = startMonth;
		this.startDay = startDay;
	}

	public void setRemainingBalance(Long remainingBalance) {
		this.remainingBalance = remainingBalance;
	}
}
