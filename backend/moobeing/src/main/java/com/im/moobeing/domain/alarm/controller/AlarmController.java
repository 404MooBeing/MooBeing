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
import org.springframework.web.bind.annotation.*;

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
    @GetMapping()
    public ResponseEntity<List<AlarmResponse>> getAlarms(@AuthenticationPrincipal Member member) {
        List<AlarmResponse> alarms = alarmService.getAndDeleteAlarms(member);
        return ResponseEntity.ok(alarms);
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

    @Operation(summary = "모든 알림 삭제", description = "사용자의 모든 알림을 삭제합니다.")
    @DeleteMapping
    public ResponseEntity<Void> deleteAllAlarm(@AuthenticationPrincipal Member member) {
        alarmService.deleteAllAlarm(member);
        return ResponseEntity.ok().build();
    }

    // 읽지 않은 알림 여부 확인
    @Operation(summary = "읽지 않은 알림 여부 확인", description = "사용자에게 읽지 않은 알림이 있는지 여부를 반환합니다.")
    @GetMapping("/unread")
    public ResponseEntity<Boolean> hasUnreadAlarms(@AuthenticationPrincipal Member member) {
        boolean hasUnread = alarmService.hasUnreadAlarms(member);
        return ResponseEntity.ok(hasUnread);
    }
}
