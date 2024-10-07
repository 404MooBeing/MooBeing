package com.im.moobeing.global.fcm;

import com.im.moobeing.global.fcm.entity.PushSubscription;
import com.im.moobeing.global.fcm.repository.PushSubscriptionRepository;
import com.im.moobeing.global.fcm.service.FCMService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

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

//    // 타임 무 수확 시기 알림
//    @Scheduled(cron = "0 0 9 1,15 * ?") // 매월 1일과 15일 오전 9시
//    public void sendHarvestTimeNotice() {
//        List<String> tokens = getAllTokens();
//        fcmService.sendHarvestTimeNotice(tokens);
//        log.info("Sent harvest time notice to all users.");
//    }

    // 만료된 구독 배치 제거
    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정 실행
    public void cleanUpOldSubscriptions() {
        LocalDateTime sixMonthsAgo = LocalDateTime.now().minus(6, ChronoUnit.MONTHS);
        repository.findAll().stream()
                .filter(subscription -> subscription.getLastUpdated().isBefore(sixMonthsAgo))
                .forEach(repository::delete);
        log.info("Cleaned up old subscriptions older than six months.");
    }
}
