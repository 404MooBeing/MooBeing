package com.im.moobeing.global.fcm.controller;

import com.im.moobeing.domain.alarm.entity.AlarmIconType;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.global.fcm.dto.SubscriptionRequest;
import com.im.moobeing.global.fcm.dto.SubscriptionResponse;
import com.im.moobeing.global.fcm.repository.PushSubscriptionRepository;
import com.im.moobeing.global.fcm.service.FCMService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/subscription")
@RequiredArgsConstructor
public class SubscriptionController {

    private final FCMService fcmService;

    @Operation(summary = "구독 등록 및 갱신", description = "사용자 구독을 등록하거나 갱신합니다.")
    @ApiResponse(responseCode = "200", description = "구독이 성공적으로 등록 또는 갱신되었습니다.")
    @PostMapping("/register")
    public ResponseEntity<SubscriptionResponse> registerSubscription(@AuthenticationPrincipal Member member, @RequestBody SubscriptionRequest request) {
        log.info("Received request to register/update subscription for token: {}", request.getToken());
        SubscriptionResponse response = fcmService.registerOrUpdateSubscription(member, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "구독 해지", description = "사용자 구독을 해지합니다.")
    @ApiResponse(responseCode = "200", description = "구독이 성공적으로 해지되었습니다.")
    @DeleteMapping("/unregister")
    public ResponseEntity<String> unregisterSubscription(@RequestParam String token) {
        log.info("Received request to unregister subscription for token: {}", token);
        fcmService.unregisterSubscription(token);
        return ResponseEntity.ok("Subscription unregistered successfully");
    }

    // 특정 사용자에게 푸시 알림 보내기
    @Operation(summary = "푸시 알림 보내기", description = "특정 사용자에게 푸시 알림을 전송합니다.")
    @PostMapping("/send")
    public ResponseEntity<String> sendPushNotification(@AuthenticationPrincipal Member member,
                                                       @RequestParam String token,
                                                       @RequestParam String title,
                                                       @RequestParam String body) {
        fcmService.sendAndRecordNotification(member, token, AlarmIconType.MOOBTI, title, body);
        return ResponseEntity.ok("푸시 알림이 성공적으로 전송되었습니다.");
    }


    // 무비티아이 확인 알림 전송
    @Operation(summary = "무비티아이 확인 알림", description = "무비티아이 확인 알림을 전송합니다.")
    @PostMapping("/send/moobt-notice")
    public ResponseEntity<String> sendMooBTINotice(@AuthenticationPrincipal Member member, @RequestBody List<String> tokens) {
        fcmService.sendMooBTINotice(tokens, member);
        return ResponseEntity.ok("무비티아이 확인 알림이 성공적으로 전송되었습니다.");
    }

    // 금융 상식 퀴즈 알림 전송
    @Operation(summary = "금융 상식 퀴즈 알림", description = "금융 상식 퀴즈 알림을 전송합니다.")
    @PostMapping("/send/finance-quiz")
    public ResponseEntity<String> sendFinanceQuizNotice(@AuthenticationPrincipal Member member, @RequestBody List<String> tokens) {
        fcmService.sendFinanceQuizNotice(tokens, member);
        return ResponseEntity.ok("금융 상식 퀴즈 알림이 성공적으로 전송되었습니다.");
    }

    // 지난 달 소비내역 퀴즈 알림 전송
    @Operation(summary = "소비내역 퀴즈 알림", description = "저번 달 소비내역 퀴즈 알림을 전송합니다.")
    @PostMapping("/send/spending-quiz")
    public ResponseEntity<String> sendMonthlySpendingQuizNotice(@AuthenticationPrincipal Member member, @RequestBody List<String> tokens) {
        fcmService.sendMonthlySpendingQuizNotice(tokens, member);
        return ResponseEntity.ok("소비내역 퀴즈 알림이 성공적으로 전송되었습니다.");
    }

    // 타임 무 수확 시기 알림 전송
    @Operation(summary = "타임 무 수확 알림", description = "타임 무 수확 시기 알림을 전송합니다.")
    @PostMapping("/send/harvest-notice")
    public ResponseEntity<String> sendHarvestTimeNotice(@AuthenticationPrincipal Member member, @RequestBody List<String> tokens) {
        fcmService.sendHarvestTimeNotice(tokens, member);
        return ResponseEntity.ok("타임 무 수확 알림이 성공적으로 전송되었습니다.");
    }
}
