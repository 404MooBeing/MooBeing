package com.im.moobeing.domain.trainsit.entity;

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
@Table(name = "MemberTransit")
public class MemberTransit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_transit_id")
	private Long id;

	@Column(name = "member_id")
	private Long memberId;

	@Column(name = "amount")
	private Long amount;

	@Column(name = "name")
	private String name;

	@Column(name = "create_at")
	private String createdAt;

	@Column(name = "update_at")
	private String updatedAt;

	@Column(name = "year")
	private Integer year;

	@Column(name = "month")
	private Integer month;

	@Builder
	public MemberTransit(Long id, Long memberId, Long amount, String name, String createdAt, String updatedAt, Integer year, Integer month) {
		this.id = id;
		this.memberId = memberId;
		this.amount = amount;
		this.name = name;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.year = year;
		this.month = month;
	}
}
