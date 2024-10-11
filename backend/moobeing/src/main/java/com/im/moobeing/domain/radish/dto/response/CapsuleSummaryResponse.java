package com.im.moobeing.domain.radish.dto.response;

import java.time.LocalDateTime;

public record CapsuleSummaryResponse(
        LocalDateTime remainTime,
        Integer count
) {
}
