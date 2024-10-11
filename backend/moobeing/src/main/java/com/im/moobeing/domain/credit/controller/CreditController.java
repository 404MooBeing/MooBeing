package com.im.moobeing.domain.credit.controller;

import com.im.moobeing.domain.credit.service.CreditService;
import com.im.moobeing.domain.member.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/credit")
@RequiredArgsConstructor
public class CreditController {

    private final CreditService creditService;

    @Operation(summary = "사용자의 신용등급 조회", description = "사용자 신용 등급 확인하는 api")
    @GetMapping
    public ResponseEntity<?> getCredit(@AuthenticationPrincipal Member member) {
        return ResponseEntity.status(HttpStatus.OK).body(creditService.getCredit(member));
    }
}
