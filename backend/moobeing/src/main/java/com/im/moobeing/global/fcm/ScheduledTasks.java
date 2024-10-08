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
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class ScheduledTasks {

    private final PushSubscriptionRepository repository;
    private final FCMService fcmService;
    private final RadishCapsuleRepository radishCapsuleRepository;

    private List<String> getAllTokens() {
        return repository.findAll().stream()
                .map(PushSubscription::getToken)
                .collect(Collectors.toList());
    }

    // 매달 무비티아이 확인 알림
    @Scheduled(cron = "0 0 9 1 * ?") // 매월 1일 오전 9시
    public void sendMooBTINotice() {
        List<String> tokens = getAllTokens();
        fcmService.sendMooBTINotice(tokens);
        log.info("Sent MooBTI notice to all users.");
    }

    // 매일 금융 상식 퀴즈 알림
    @Scheduled(cron = "0 0 9 * * ?") // 매일 오전 9시
    public void sendFinanceQuizNotice() {
        List<String> tokens = getAllTokens();
        fcmService.sendFinanceQuizNotice(tokens);
        log.info("Sent daily finance quiz notice to all users.");
    }

    // 매달 소비내역 퀴즈 알림
    @Scheduled(cron = "0 0 9 1 * ?") // 매월 1일 오전 9시
    public void sendMonthlySpendingQuizNotice() {
        List<String> tokens = getAllTokens();
        fcmService.sendMonthlySpendingQuizNotice(tokens);
        log.info("Sent monthly spending quiz notice to all users.");
    }

    // 매시간마다 수확 시점을 지난 캡슐에 대해 알림을 보냄
    @Scheduled(cron = "0 0 * * * ?") // 매 정시마다 실행
    @Transactional
    public void checkHarvestTimeAndNotify() {
        LocalDateTime now = LocalDateTime.now();

        // 수확 시점을 넘겼으나 아직 수확되지 않은 캡슐 조회
        List<RadishCapsule> overdueCapsules = radishCapsuleRepository.findByEndAtBeforeAndIsHarvestedFalse(now);

        overdueCapsules.forEach(capsule -> {
            try {
                // 해당 캡슐을 소유한 회원의 구독 토큰들을 조회
                List<String> tokens = capsule.getMember().getPushSubscriptions().stream()
                        .map(PushSubscription::getToken)
                        .collect(Collectors.toList());

                // 알림 전송
                fcmService.sendHarvestTimeNotice(tokens);

                // 수확 완료 상태로 업데이트하여 중복 알림 방지
                capsule.harvest();
                radishCapsuleRepository.save(capsule);
            } catch (Exception e) {
                log.error("Failed to send harvest time notification for capsuleId {}: {}", capsule.getId(), e.getMessage());
            }
        });

        log.info("Sent harvest time notifications for {} overdue capsules.", overdueCapsules.size());
    }

    // 만료된 구독 배치 제거
    // ScheduledTasks 클래스에서 FCMService의 메서드를 호출하는 방식으로 변경
    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정 실행
    public void cleanUpOldSubscriptions() {
        fcmService.removeExpiredSubscriptions(); // FCMService의 만료 구독 삭제 메서드 호출
        log.info("Daily cleanup of old subscriptions completed.");
    }
}
