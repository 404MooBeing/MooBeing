package com.im.moobeing.domain.radish.dto.response;

import java.time.LocalDateTime;

public record CreateRadishCapsuleResponse(
        LocalDateTime harvestAt,
        Double lat,
        Double lng,
        String imageUrl
) {
}
