package com.im.moobeing.domain.radish.dto.request;

public record RadishCapsuleAreaRequest(
        Double latTopRight,
        Double lngTopRight,
        Double latBottomLeft,
        Double lngBottomLeft
) {}