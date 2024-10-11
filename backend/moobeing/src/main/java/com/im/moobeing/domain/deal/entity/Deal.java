package com.im.moobeing.domain.deal.entity;

import com.im.moobeing.domain.account.entity.Account;
import com.im.moobeing.global.entity.BaseTimeEntity;

import com.im.moobeing.domain.member.entity.Member;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "deal")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Deal extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long dealId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@Enumerated(EnumType.STRING)
	@Column(name = "deal_category", nullable = true)
	private DealCategory dealCategory;

	@Column
	private String title;

	@Column
	private Long price;

	@Column(name = "remain_balance")
	private Long remainBalance;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "account_id")
	private Account account;

	@Builder
	public Deal(Member member, DealCategory dealCategory, String title, Long price, Long remainBalance, Account account) {
		this.member = member;
		this.dealCategory = dealCategory;
		this.title = title;
		this.price = price;
		this.remainBalance = remainBalance;
		this.account = account;
	}

	public Long getAbsPrice() {
		return Math.abs(price);
	}

	@Override
	public String toString() {
		return title + " " + price;
	}
}
