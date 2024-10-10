package com.im.moobeing.global.fcm.service;

import com.google.firebase.messaging.AndroidConfig;
import com.google.firebase.messaging.AndroidNotification;
import com.google.firebase.messaging.ApnsConfig;
import com.google.firebase.messaging.Aps;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.im.moobeing.domain.alarm.entity.AlarmIconType;
import com.im.moobeing.domain.alarm.service.AlarmService;
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
    private final AlarmService alarmService; // 알림 서비스 주입

    // 알림 전송과 동시에 알림 기록
    @Transactional
    public void sendAndRecordNotification(Member member, String token, AlarmIconType iconType, String title, String body) {
        // FCM 알림 전송
        sendPushNotification(token, title, body);

        // 알림 기록
        alarmService.createAlarm(member, iconType);
        log.info("Notification sent and recorded for memberId {}", member.getId());
    }

    // 구독 추가 및 갱신
    @Transactional
    public SubscriptionResponse registerOrUpdateSubscription(Member member, SubscriptionRequest request) {
        // 사용자 ID로 기존 구독 정보 조회
        Optional<PushSubscription> existingSubscription = subscriptionRepository.findByMemberId(member.getId());

        if (existingSubscription.isPresent()) {
            PushSubscription subscription = existingSubscription.get();
            // 현재 토큰과 요청된 토큰이 같은지 확인
            if (existingSubscription.get().getToken() != null && subscription.getToken().equals(request.getToken())) {
                // 같은 경우 lastUpdated만 갱신
                log.info("Existing subscription with same token for memberId {}. Updating lastUpdated time.", member.getId());
                subscription.setLastUpdated(LocalDateTime.now());
            } else {
                // 다른 경우 새로운 토큰으로 변경하고 lastUpdated 갱신
                log.info("Existing subscription with different token for memberId {}. Updating token and lastUpdated time.", member.getId());
                subscription.setToken(request.getToken());
                subscription.setLastUpdated(LocalDateTime.now());
            }
        } else {
            // 사용자의 기존 구독이 없는 경우 새로운 구독 생성 및 저장
            log.info("No existing subscription for memberId: {}. Registering new token: {}", member.getId(), request.getToken());
            PushSubscription subscription = PushSubscription.builder()
                    .token(request.getToken())
                    .member(member)
                    .lastUpdated(LocalDateTime.now())
                    .build();
            subscriptionRepository.save(subscription);
        }

        // 응답을 위해 SubscriptionResponse 반환
        return new SubscriptionResponse(request.getToken(), LocalDateTime.now());
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
                .setImage("https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9")
                .build())

            // AndroidConfig 설정
            .setAndroidConfig(AndroidConfig.builder()
                .setNotification(AndroidNotification.builder()
                    .setClickAction("OPEN_APP")  // Android 인텐트 필터와 연결될 액션 설정
                    .build())
                .build())

            // ApnsConfig 설정 (iOS)
            .setApnsConfig(ApnsConfig.builder()
                .setAps(Aps.builder()
                    .setCategory("OPEN_APP")  // iOS에서 카테고리로 설정
                    .build())
                .build())

            .build();

    }

    // 무비티아이 확인 알림
    @Async
    public void sendMooBTINotice(List<String> tokens, Member member) {
        tokens.forEach(token -> sendAndRecordNotification(
                member, token, AlarmIconType.MOOBTI, "이번 달 당신의 무비티아이는!?", "소비 내역을 바탕으로 분석한 당신의 무비티아이를 확인하세요!"
        ));
    }

    @Async
    public void sendFinanceQuizNotice(List<String> tokens, Member member) {
        tokens.forEach(token -> sendAndRecordNotification(
                member, token, AlarmIconType.QUIZ_ECONOMY, "오늘의 금융 상식 퀴즈!", "금융 지식을 테스트할 퀴즈에 참여해보세요."
        ));
    }

    @Async
    public void sendMonthlySpendingQuizNotice(List<String> tokens, Member member) {
        tokens.forEach(token -> sendAndRecordNotification(
                member, token, AlarmIconType.QUIZ, "저번 달 소비내역 퀴즈!", "저번 달의 소비내역을 기반으로 한 퀴즈에 참여하세요!"
        ));
    }

    @Async
    public void sendHarvestTimeNotice(List<String> tokens, Member member) {
        tokens.forEach(token -> sendAndRecordNotification(
                member, token, AlarmIconType.TIME, "타임 무 수확 시기!", "지금이 수확의 적기입니다! 타임 무를 확인하세요."
        ));
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
