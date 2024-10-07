package com.im.moobeing.global.fcm.controller;

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

@Slf4j
@RestController
@RequestMapping("/api/subscription")
@RequiredArgsConstructor
public class SubscriptionController {

    private final PushSubscriptionRepository repository;
    private final FCMService subscriptionService;

    @Operation(summary = "구독 등록 및 갱신", description = "사용자 구독을 등록하거나 갱신합니다.")
    @ApiResponse(responseCode = "200", description = "구독이 성공적으로 등록 또는 갱신되었습니다.")
    @PostMapping("/register")
    public ResponseEntity<SubscriptionResponse> registerSubscription(@AuthenticationPrincipal Member member, @RequestBody SubscriptionRequest request) {
        log.info("Received request to register/update subscription for token: {}", request.getToken());
        SubscriptionResponse response = subscriptionService.registerOrUpdateSubscription(member, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "구독 해지", description = "사용자 구독을 해지합니다.")
    @ApiResponse(responseCode = "200", description = "구독이 성공적으로 해지되었습니다.")
    @DeleteMapping("/unregister")
    public ResponseEntity<String> unregisterSubscription(@RequestParam String token) {
        log.info("Received request to unregister subscription for token: {}", token);
        subscriptionService.unregisterSubscription(token);
        return ResponseEntity.ok("Subscription unregistered successfully");
    }
}
