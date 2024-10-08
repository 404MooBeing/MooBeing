package com.im.moobeing.domain.point.controller;

import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.point.dto.request.PointTransactionHistoryRequest;
import com.im.moobeing.domain.point.dto.request.PointWithdrawRequest;
import com.im.moobeing.domain.point.dto.response.PointTransactionHistoryResponse;
import com.im.moobeing.domain.point.service.PointService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/point")
public class PointController {

    private final PointService pointService;

    @Operation(summary = "포인트 출금", description = "본인 계좌로 포인트를 출금합니다.")
    @PostMapping("/withdraw")
    public ResponseEntity<Void> withdrawPoints(
            @AuthenticationPrincipal Member member,
            @RequestBody PointWithdrawRequest pointWithdrawRequest

    ) {
        pointService.withdrawPoints(member, pointWithdrawRequest.accountId(), pointWithdrawRequest.amount());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "포인트 입금", description = "포인트를 추가합니다.")
    @PostMapping("/deposit")
    public ResponseEntity<Void> depositPoints(
            @AuthenticationPrincipal Member member,
            @RequestParam Long amount
    ) {
        pointService.depositPoints(member, amount);
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "포인트 내역 조회",
            description = "지정된 계좌 ID, 조회 기간, 거래 유형(전체, 적립, 사용)에 따라 사용자의 포인트 거래 내역을 페이지별로 조회합니다."
    )
    @PostMapping("/history")
    public ResponseEntity<List<PointTransactionHistoryResponse>> getPointTransactionHistory(
            @RequestBody PointTransactionHistoryRequest request,
            @AuthenticationPrincipal Member member) {
        log.error(String.valueOf(member.getId()));
        return ResponseEntity.ok(pointService.getPointTransactionHistory(request, member));
    }

    @GetMapping("/my")
    public ResponseEntity<Long> getMyPoint(@AuthenticationPrincipal Member member) {
        return ResponseEntity.ok(pointService.getCurrentBalance(member));
    }
}
