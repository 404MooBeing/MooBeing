package com.im.moobeing.global.fcm.entity;

import com.im.moobeing.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Table(name = "push_subscription")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE) // Builder를 위한 생성자 접근 제어
@Builder  // 빌더 패턴 추가
public class PushSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // setMember 메서드 추가
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)  // Member와 다대일 관계 설정
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;  // 구독을 소유하는 Member

    @Setter
    private String token;  // FCM 토큰

    @Setter
    private LocalDateTime lastUpdated;

}
