package com.im.moobeing.domain.loan.entity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "LoanProduct")
public class LoanProduct {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "loan_product_id")
	private Long id;

	@Column(name = "loan_name", nullable = false)
	private String loanName;

	@Column(name = "bank_image_url")
	private String bankImageUrl;

	@Column(name = "bank_name", length = 50)
	private String bankName;

	@Column(name = "loan_period")
	private Long loanPeriod;

	@Column(name = "interest_rate")
	private Double interestRate;

	@Column(name = "description", length = 200)
	private String description;

	@Builder
	public LoanProduct(Long id, String loanName, String bankImageUrl, String bankName, Long loanPeriod, Double interestRate, String description) {
		this.id = id;
		this.loanName = loanName;
		this.bankImageUrl = bankImageUrl;
		this.bankName = bankName;
		this.loanPeriod = loanPeriod;
		this.interestRate = interestRate;
		this.description = description;
	}
}
