package com.im.moobeing.domain.loan.entity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "AverageLoanRepaymentRecord")
public class AverageLoanRepaymentRecord {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "average_loan_repayment_record_id")
	private Long id;

	@Column(name = "loan_name")
	private String loanName;

	@Column(name = "age")
	private Integer age;

	@Column(name = "month")
	private Integer month;

	@Column(name = "repayment_balance")
	private Long repaymentBalance;

	@Builder
	public AverageLoanRepaymentRecord(Long id, String loanName, Integer age, Integer month, Long repaymentBalance) {
		this.id = id;
		this.loanName = loanName;
		this.age = age;
		this.month = month;
		this.repaymentBalance = repaymentBalance;
	}
}
