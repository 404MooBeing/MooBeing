package com.im.moobeing.domain.radish.controller;

import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.radish.dto.request.CreateRadishCapsuleRequest;
import com.im.moobeing.domain.radish.dto.request.RadishCapsuleAreaRequest;
import com.im.moobeing.domain.radish.dto.response.*;
import com.im.moobeing.domain.radish.entity.RadishCapsule;
import com.im.moobeing.domain.radish.repository.RadishCapsuleRepository;
import com.im.moobeing.domain.radish.service.RadishService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/radish")
@RequiredArgsConstructor
public class RadishController {

    private final RadishService radishService;
    private final RadishCapsuleRepository radishCapsuleRepository;

    @Operation(summary = "테스트용 메서드, 모든 캡슐 조회", description = "엔티티를 가져오는 메서드입니다.")
    @GetMapping("/test/all")
    public ResponseEntity<List<TestCapsuleResponse>> getAllCapsules() {
        return ResponseEntity.ok(radishService.getAllCapsules());
    }

    @Operation(summary = "테스트용 메서드, 무 다시 심기", description = "id에 따라 isHarvested를 조정합니다")
    @PostMapping("/test/{id}")
    public ResponseEntity<TestCapsuleResponse> reviveCapsule(@PathVariable Long id) {
        return ResponseEntity.ok(radishService.reviveCapsule(id));
    }

    @Operation(summary = "나의 무들 확인", description = "보유 중인 무를 반환합니다. 이후 radishId를 함께 요청")
    @GetMapping("/characters")
    public ResponseEntity<List<CharactersResponse>> getCharacters(@AuthenticationPrincipal Member member) {
        return ResponseEntity.ok(radishService.characters(member, true));
    }

    @Operation(summary = "나의 무들 확인 아기 무 없음", description = "캡슐 심기 전 보유 중인 무를 반환합니다. 이후 radishId를 함께 요청")
    @GetMapping("/growncharacters")
    public ResponseEntity<List<CharactersResponse>> getGrownCharacters(@AuthenticationPrincipal Member member) {
        return ResponseEntity.ok(radishService.characters(member, false));
    }

    @Operation(summary = "무 심기", description = "무를 심습니다. 수확일자, 위치 반환")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CreateRadishCapsuleResponse> createRadishCapsule(
            @AuthenticationPrincipal Member member,
            @ModelAttribute CreateRadishCapsuleRequest requestDto
    ) {
        return ResponseEntity.ok(radishService.createRadishCapsule(member, requestDto));
    }

    @Operation(summary = "캡슐 조회", description = "해당 년도와 월에 해당하는 캡슐을 페이지별로 조회합니다. year month 둘 중 하나라도 null이면 전체 조회")
    @GetMapping("/my-capsule")
    public ResponseEntity<List<RadishCapsuleResponse>> getRadishCapsuleByMonth(
            @AuthenticationPrincipal Member member,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month,
            @RequestParam Integer page
    ) {
        if (year == null || month == null) {
            return ResponseEntity.ok(radishService.getAllRadishCapsules(member, page));
        }
        return ResponseEntity.ok(radishService.getRadishCapsuleByMonth(member, year, month, page));
    }

    @Operation(summary = "무 수확", description = "캡슐 아이디로 무를 수확합니다. 수확 가능 시간이 되어야 수확할 수 있습니다.")
    @PostMapping("/harvest/{capsuleId}")
    public ResponseEntity<RadishCapsuleHarvestResponse> harvestRadish(
            @AuthenticationPrincipal Member member,
            @PathVariable Long capsuleId
    ) {
        RadishCapsuleHarvestResponse response = radishService.harvestRadishCapsule(capsuleId, member);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "좌표 범위 내 수확되지 않은 무 조회", description = "좌표 범위 내에 수확되지 않은 무를 조회합니다.")
    @PostMapping("/area")
    public ResponseEntity<List<RadishCapsuleAreaResponse>> getUnharvestedCapsulesInArea(
            @AuthenticationPrincipal Member member,
            @RequestBody RadishCapsuleAreaRequest request) {
        List<RadishCapsuleAreaResponse> responses = radishService.findUnharvestedCapsulesInArea(member, request);
        return ResponseEntity.ok(responses);
    }

    @Operation(summary = "수확하지 않은 무 중, 수확 시기가 아직 되지 않은 모든 무 요약 조회", description = "수확하지 않은 무 중, 수확 하지 않은 무 수, 수확 시기가 아직 되지 않은 무 요약 조회")
    @GetMapping("/summary")
    public ResponseEntity<CapsuleSummaryResponse> getSummaryRadish(@AuthenticationPrincipal Member member) {
        return ResponseEntity.ok(radishService.getRadishSummary(member));
    }
}