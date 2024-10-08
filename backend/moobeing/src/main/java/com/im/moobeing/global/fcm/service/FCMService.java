package com.im.moobeing.global.fcm.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.global.fcm.dto.SubscriptionRequest;
import com.im.moobeing.global.fcm.dto.SubscriptionResponse;
import com.im.moobeing.global.fcm.entity.PushSubscription;
import com.im.moobeing.global.fcm.repository.PushSubscriptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FCMService {

    private final PushSubscriptionRepository subscriptionRepository;

    // 구독 추가 및 갱신
    @Transactional
    public SubscriptionResponse registerOrUpdateSubscription(Member member, SubscriptionRequest request) {
        Optional<PushSubscription> existingSubscription = subscriptionRepository.findByMemberId(member.getId());

        PushSubscription subscription;
        if (existingSubscription.isPresent()) {
            subscription = existingSubscription.get();
            log.info("Existing subscription found for memberId {}. Updating lastUpdated time.", member.getId());
            subscription.setLastUpdated(LocalDateTime.now());
        } else {
            log.info("New subscription for memberId: {}. Registering token: {}", member.getId(), request.getToken());
            subscription = new PushSubscription();
            subscription.setToken(request.getToken());
            subscription.setMember(member);  // Member와 연관 설정
            subscription.setLastUpdated(LocalDateTime.now());
        }

        PushSubscription savedSubscription = subscriptionRepository.save(subscription);
        return new SubscriptionResponse(savedSubscription.getToken(), savedSubscription.getLastUpdated());

    }

    // 구독 삭제
    @Transactional
    public void unregisterSubscription(String token) {
        log.info("Attempting to unregister token: {}", token);
        subscriptionRepository.deleteByToken(token);
        log.info("Unregistered token: {}", token);
    }

    // 만료된 구독 배치 제거
    @Transactional
    public void removeExpiredSubscriptions() {
        LocalDateTime thresholdDate = LocalDateTime.now().minusDays(30);
        List<PushSubscription> expiredSubscriptions = subscriptionRepository.findAll().stream()
                .filter(subscription -> subscription.getLastUpdated().isBefore(thresholdDate))
                .toList();

        log.info("Removing {} expired subscriptions", expiredSubscriptions.size());
        subscriptionRepository.deleteAll(expiredSubscriptions);
    }

    public void sendPushNotification(String targetToken, String title, String body) {
        Message message = createMessage(targetToken, title, body);

        try {
            FirebaseMessaging.getInstance().send(message);
            log.info("Notification sent successfully to token: {}", targetToken);
        } catch (Exception e) {
            log.error("Error sending push notification to token: {} - Error: {}", targetToken, e.getMessage());
        }
    }

    // 메시지 생성 메서드 추가
    private Message createMessage(String targetToken, String title, String body) {
        return Message.builder()
                .setToken(targetToken)
                .setNotification(Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .build();
    }

    // 무비티아이 확인 알림
    @Async
    public void sendMooBTINotice(List<String> tokens) {
        sendNotification(tokens, "이번 달 당신의 무비티아이는!?", "소비 내역을 바탕으로 분석한 당신의 무비티아이를 확인하세요!");
    }

    // 금융 상식 퀴즈 알림
    @Async
    public void sendFinanceQuizNotice(List<String> tokens) {
        sendNotification(tokens, "오늘의 금융 상식 퀴즈!", "금융 지식을 테스트할 퀴즈에 참여해보세요.");
    }

    // 지난 달 소비내역 퀴즈 알림
    @Async
    public void sendMonthlySpendingQuizNotice(List<String> tokens) {
        sendNotification(tokens, "저번 달 소비내역 퀴즈!", "저번 달의 소비내역을 기반으로 한 퀴즈에 참여하세요!");
    }

    // 타임 무 수확 시기 알림
    @Async
    public void sendHarvestTimeNotice(List<String> tokens) {
        sendNotification(tokens, "타임 무 수확 시기!", "지금이 수확의 적기입니다! 타임 무를 확인하세요.");
    }

    // 공통 알림 전송 메서드
    private void sendNotification(List<String> tokens, String title, String body) {
        for (String token : tokens) {
            Message message = Message.builder()
                    .setToken(token)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(body)
                            .build())
                    .build();

            try {
                FirebaseMessaging.getInstance().sendAsync(message);
                log.info("Sent notification to token: {}", token);
            } catch (Exception e) {
                log.error("Failed to send notification to token: {} - Error: {}", token, e.getMessage());
            }
        }
    }
}
