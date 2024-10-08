package com.im.moobeing.global.fcm;

import com.im.moobeing.domain.radish.entity.RadishCapsule;
import com.im.moobeing.domain.radish.repository.RadishCapsuleRepository;
import com.im.moobeing.global.fcm.entity.PushSubscription;
import com.im.moobeing.global.fcm.repository.PushSubscriptionRepository;
import com.im.moobeing.global.fcm.service.FCMService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class ScheduledTasks {

    private final PushSubscriptionRepository subscriptionRepository;
    private final FCMService fcmService;
    private final RadishCapsuleRepository radishCapsuleRepository;

    // 조회된 구독 정보 필드
    private List<PushSubscription> subscriptions;

    // 매일 오전 8시에 구독 정보 조회
    @Scheduled(cron = "0 0 8 * * ?") // 매일 오전 8시 실행
    public void loadSubscriptions() {
        subscriptions = subscriptionRepository.findAll();  // DB에서 모든 구독 정보 조회
        log.info("Loaded subscriptions at 8 AM.");
    }

    // 매일 무비티아이 확인 알림 전송 (구독 데이터 활용)
    @Scheduled(cron = "0 0 9 1 * ?") // 매월 1일 오전 9시
    public void sendMooBTINotice() {
        if (subscriptions == null) loadSubscriptions();
        subscriptions.forEach(subscription -> fcmService.sendMooBTINotice(
                List.of(subscription.getToken()),
                subscription.getMember()
        ));
        log.info("Sent MooBTI notice to all users.");
    }

    // 매일 금융 상식 퀴즈 알림 전송 (구독 데이터 활용)
    @Scheduled(cron = "0 0 9 * * ?") // 매일 오전 9시
    public void sendFinanceQuizNotice() {
        if (subscriptions == null) loadSubscriptions();
        subscriptions.forEach(subscription -> fcmService.sendFinanceQuizNotice(
                List.of(subscription.getToken()),
                subscription.getMember()
        ));
        log.info("Sent daily finance quiz notice to all users.");
    }

    // 매달 소비내역 퀴즈 알림 전송 (구독 데이터 활용)
    @Scheduled(cron = "0 0 9 1 * ?") // 매월 1일 오전 9시
    public void sendMonthlySpendingQuizNotice() {
        if (subscriptions == null) loadSubscriptions();
        subscriptions.forEach(subscription -> fcmService.sendMonthlySpendingQuizNotice(
                List.of(subscription.getToken()),
                subscription.getMember()
        ));
        log.info("Sent monthly spending quiz notice to all users.");
    }

    // 매시간마다 수확 시점을 지난 캡슐에 대해 알림을 보냄 (구독 데이터 활용)
    @Scheduled(cron = "0 0 * * * ?") // 매 정시마다 실행
    @Transactional
    public void checkHarvestTimeAndNotify() {
        LocalDateTime now = LocalDateTime.now();

        // 수확 시점을 넘겼으나 아직 수확되지 않은 캡슐 조회
        List<RadishCapsule> overdueCapsules = radishCapsuleRepository.findByEndAtBeforeAndIsHarvestedFalse(now);

        overdueCapsules.forEach(capsule -> {
            try {
                List<PushSubscription> subscriptions = capsule.getMember().getPushSubscriptions();
                subscriptions.forEach(subscription -> fcmService.sendHarvestTimeNotice(
                        List.of(subscription.getToken()),
                        subscription.getMember()
                ));

                // 수확 완료 상태로 업데이트하여 중복 알림 방지
                capsule.harvest();
                radishCapsuleRepository.save(capsule);
            } catch (Exception e) {
                log.error("Failed to send harvest time notification for capsuleId {}: {}", capsule.getId(), e.getMessage());
            }
        });

        log.info("Sent harvest time notifications for {} overdue capsules.", overdueCapsules.size());
    }

    // 만료된 구독 배치 제거 (매일 자정 실행)
    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정 실행
    public void cleanUpOldSubscriptions() {
        fcmService.removeExpiredSubscriptions(); // FCMService의 만료 구독 삭제 메서드 호출
        log.info("Daily cleanup of old subscriptions completed.");
    }
}
