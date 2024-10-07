package com.im.moobeing.global.fcm.entity;

import com.im.moobeing.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Table(name = "push_subscription")
@Entity
@Data
public class PushSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)  // Member와 다대일 관계 설정
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;  // 구독을 소유하는 Member

    private String token;  // FCM 토큰
    private LocalDateTime lastUpdated;
}
