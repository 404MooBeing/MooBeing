package com.im.moobeing.domain.loan.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "LoanRepaymentRecord")
public class LoanRepaymentRecord {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "loan_repayment_record_id")
	private Long id;

	@Column(name = "member_loan_id")
	private Long memberLoanId;

	@Column(name = "repayment_balance")
	private Long repaymentBalance;

	@Column(name = "repayment_date")
	private Timestamp repaymentDate;

	@Column(name = "create_at")
	private String createdAt;

	@Column(name = "update_at")
	private String updatedAt;

	@Column(name = "year")
	private Integer year;

	@Column(name = "month")
	private Integer month;

	@Column(name = "day")
	private Integer day;

	@Builder
	public LoanRepaymentRecord(Long id, Long memberLoanId, Long repaymentBalance, Timestamp repaymentDate, String createdAt, String updatedAt, Integer year, Integer month, Integer day) {
		this.id = id;
		this.memberLoanId = memberLoanId;
		this.repaymentBalance = repaymentBalance;
		this.repaymentDate = repaymentDate;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.year = year;
		this.month = month;
		this.day = day;
	}
}
