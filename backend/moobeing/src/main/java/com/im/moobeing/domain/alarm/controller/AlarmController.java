package com.im.moobeing.domain.alarm.controller;

import com.im.moobeing.domain.alarm.dto.response.AlarmResponse;
import com.im.moobeing.domain.alarm.entity.Alarm;
import com.im.moobeing.domain.alarm.entity.AlarmIconType;
import com.im.moobeing.domain.alarm.repository.AlarmRepository;
import com.im.moobeing.domain.alarm.service.AlarmService;
import com.im.moobeing.domain.member.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.management.Notification;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/alarm")
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmService alarmService;
    private final AlarmRepository alarmRepository;

    @Operation(
            summary = "한 달 안의 알림 조회 및 삭제",
            description = "사용자의 알림을 최근 한 달 내의 알림만 조회한 뒤 반환하고, 조회된 알림을 삭제합니다."
    )
    @GetMapping
    public ResponseEntity<List<AlarmResponse>> getAllAlarms(@AuthenticationPrincipal Member member) {
        return ResponseEntity.ok(alarmService.getRecentAlarms(member));
    }

    @Operation(summary = "알림 목 데이터 생성", description = "테스트용 알림 목 데이터를 생성합니다.")
    @PostMapping("/test")
    public ResponseEntity<String> createTestNotifications(@AuthenticationPrincipal Member member) {
        // 알림 목 데이터 생성
        List<Alarm> alarms = List.of(
                new Alarm(member, AlarmIconType.MOOBTI, AlarmIconType.MOOBTI.getTitle(), AlarmIconType.MOOBTI.getMessage(), LocalDateTime.now().minusHours(15)),
                new Alarm(member, AlarmIconType.QUIZ_ECONOMY, AlarmIconType.QUIZ_ECONOMY.getTitle(), AlarmIconType.QUIZ_ECONOMY.getMessage(), LocalDateTime.now().minusHours(17)),
                new Alarm(member, AlarmIconType.QUIZ, AlarmIconType.QUIZ.getTitle(), AlarmIconType.QUIZ.getMessage(), LocalDateTime.now().minusDays(2)),
                new Alarm(member, AlarmIconType.TIME, AlarmIconType.TIME.getTitle(), AlarmIconType.TIME.getMessage(), LocalDateTime.now().minusDays(6)),
                new Alarm(member, AlarmIconType.MOOBTI, AlarmIconType.MOOBTI.getTitle(), AlarmIconType.MOOBTI.getMessage(), LocalDateTime.now().minusHours(15))
        );

        alarmRepository.saveAll(alarms);

        return ResponseEntity.ok("완료");
    }
}
