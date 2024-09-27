package com.im.moobeing.domain.account.entity;

import com.im.moobeing.domain.deal.entity.Deal;
import com.im.moobeing.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity(name = "account")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "account_id")
	private Long accountId;

	@Column(name = "account_name")
	private String accountName;

	@Column(name = "account_num")
	private String accountNum;

	@JoinColumn(name = "member_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Member member;

	@Column(name = "account_balance")
	private Long accountBalance;

	@OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Deal> deals;

	@Builder
	public Account(Long accountId, String accountNum, Member member, Long accountBalance) {
		this.accountId = accountId;
		this.accountNum = accountNum;
		this.accountBalance = accountBalance;
		this.member = member;
	}

	public void setAccountBalance(Long accountBalance) {
		this.accountBalance = accountBalance;
	}

	public void updateBalance(Long diff) {
		this.accountBalance += diff;
	}
}