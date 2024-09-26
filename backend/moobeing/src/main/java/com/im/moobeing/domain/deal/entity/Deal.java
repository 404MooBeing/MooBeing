package com.im.moobeing.domain.deal.entity;

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
	@Column(name = "deal_category")
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
