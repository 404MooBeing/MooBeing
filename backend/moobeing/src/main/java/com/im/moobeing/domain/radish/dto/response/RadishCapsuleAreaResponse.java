package com.im.moobeing.domain.radish.dto.response;

import com.im.moobeing.domain.radish.entity.RadishCapsule;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Duration;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class RadishCapsuleAreaResponse {
    private Long id;
    private String radishImage;
    private long remainingDays;
    private Double lat;
    private Double lng;

    public static RadishCapsuleAreaResponse of(RadishCapsule capsule) {
        long remainingDays = Duration.between(LocalDateTime.now(), capsule.getEndAt()).toDays();
        return new RadishCapsuleAreaResponse(capsule.getId(), capsule.getCharacter().getRadishImageUrl(), remainingDays, capsule.getLat(), capsule.getLng());
    }
}
