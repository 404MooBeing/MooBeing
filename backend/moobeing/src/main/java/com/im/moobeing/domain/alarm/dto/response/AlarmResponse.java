package com.im.moobeing.domain.alarm.dto.response;

import com.im.moobeing.domain.alarm.entity.Alarm;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record AlarmResponse(
        Long id,
        String title,
        String iconName,
        String message,
        LocalDateTime createdAt
) {
    public static AlarmResponse of(Alarm alarm) {
        return new AlarmResponse(
                alarm.getId(),
                alarm.getTitle(),
                alarm.getIconName().name(),
                alarm.getMessage(),
                alarm.getCreatedAt());
    }
}
