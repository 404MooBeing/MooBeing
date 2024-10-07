package com.im.moobeing.domain.point.dto.request;

import org.springframework.web.bind.annotation.RequestParam;

public record PointWithdrawRequest(
        Long accountId,
        Long amount
) {
}
