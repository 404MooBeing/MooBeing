package com.im.moobeing.domain.expense.entity;

import com.im.moobeing.global.entity.BaseTimeEntity;
import java.time.LocalDateTime;

import com.im.moobeing.domain.member.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "expense")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Deal extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long expenseId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "expense_category_id")
	private DealCategory dealCategory;

	@Column
	private String title;

	@Column
	private Long price;

	@Builder
	private Deal(Member member, DealCategory dealCategory, String title, Long price) {
		this.member = member;
		this.dealCategory = dealCategory;
		this.price = price;
		this.title = title;
	}
}
