package com.im.moobeing.domain.alarm.service;


import com.im.moobeing.domain.alarm.dto.response.AlarmResponse;
import com.im.moobeing.domain.alarm.entity.Alarm;
import com.im.moobeing.domain.alarm.entity.AlarmIconType;
import com.im.moobeing.domain.alarm.repository.AlarmRepository;
import com.im.moobeing.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final AlarmRepository alarmRepository;

    @Transactional
    public List<AlarmResponse> getRecentAlarms(Member member) {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        List<AlarmResponse> responses = alarmRepository.findAllByMemberAndCreatedAtAfter(member, oneMonthAgo)
                .stream()
                .map(AlarmResponse::of)
                .toList();

        return responses;
    }

    @Transactional
    public List<AlarmResponse> getAndDeleteAlarms(Member member) {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);

        // 한 달 내의 알림 조회
        List<Alarm> alarms = alarmRepository.findAllByMemberAndCreatedAtAfter(member, oneMonthAgo);
        List<AlarmResponse> responses = alarms.stream()
                .map(AlarmResponse::of)
                .toList();

        // 조회된 알림 삭제
        alarmRepository.deleteAllByMember(member);

        return responses;
    }

    @Transactional
    public void createAlarm(Member member, AlarmIconType iconType) {
        Alarm alarm = Alarm.builder()
                .member(member)
                .iconName(iconType)
                .message(iconType.getMessage())
                .title(iconType.getTitle())
                .createdAt(LocalDateTime.now())
                .build();

        alarmRepository.save(alarm);
    }

    @Transactional
    public void deleteAllAlarm(Member member) {
        alarmRepository.deleteAllByMember(member);
    }

    @Transactional(readOnly = true)
    public boolean hasUnreadAlarms(Member member) {
        return alarmRepository.existsByMember(member);
    }
}
