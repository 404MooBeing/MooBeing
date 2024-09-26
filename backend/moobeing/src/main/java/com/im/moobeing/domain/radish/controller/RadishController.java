package com.im.moobeing.domain.radish.controller;

import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.radish.dto.request.CreateRadishCapsuleRequest;
import com.im.moobeing.domain.radish.dto.response.CharactersResponse;
import com.im.moobeing.domain.radish.dto.response.CreateRadishCapsuleResponse;
import com.im.moobeing.domain.radish.service.RadishService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/radish")
@RequiredArgsConstructor
public class RadishController {

    private final RadishService radishService;

    @Operation(summary = "나의 무들 확인", description = "캡슐 심기 전 보유 중인 무를 반환합니다. 이후 radishId를 함께 요청")
    @GetMapping("/characters")
    public ResponseEntity<List<CharactersResponse>> getCharacters(@AuthenticationPrincipal Member member) {
        return ResponseEntity.ok(radishService.characters(member));
    }

    @Operation(summary = "무 심기", description = "무를 심습니다. 수확일자, 위치 반환")
    @PostMapping
    public ResponseEntity<CreateRadishCapsuleResponse> createRadishCapsule(
            @AuthenticationPrincipal Member member,
            @ModelAttribute CreateRadishCapsuleRequest requestDto
    ) {
        return ResponseEntity.ok(radishService.createRadishCapsule(member, requestDto));
    }
}