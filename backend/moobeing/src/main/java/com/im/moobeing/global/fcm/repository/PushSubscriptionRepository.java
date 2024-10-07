package com.im.moobeing.global.fcm.repository;

import com.im.moobeing.global.fcm.entity.PushSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PushSubscriptionRepository extends JpaRepository<PushSubscription, Long> {
    Optional<PushSubscription> findByMemberId(Long memberId);
    Optional<PushSubscription> findByToken(String token);
    void deleteByToken(String token);
    void deleteByMemberId(Long memberId);

    List<PushSubscription> findAllByMemberId(Long memberId); // 특정 사용자의 모든 구독 가져오기
}
