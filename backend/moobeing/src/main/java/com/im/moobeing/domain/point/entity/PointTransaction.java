package com.im.moobeing.domain.point.entity;

import com.im.moobeing.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "point_transaction")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PointTransaction {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "remain_balance")
    private Long remainBalance;

    @Column(name = "create_at")
    private LocalDateTime createdAt;

    @Builder
    public PointTransaction(Member member, Long amount, Long remainBalance, LocalDateTime createdAt) {
        this.member = member;
        this.amount = amount;
        this.remainBalance = remainBalance;
        this.createdAt = createdAt;
    }
}

