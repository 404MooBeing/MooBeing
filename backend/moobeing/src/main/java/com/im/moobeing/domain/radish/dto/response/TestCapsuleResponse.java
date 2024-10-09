package com.im.moobeing.domain.radish.dto.response;

import com.im.moobeing.domain.radish.entity.RadishCapsule;

public record TestCapsuleResponse(
        Long id,
        String title,
        String description,
        String placeName,
        String img,
        boolean isHarvested,
        long memberId,
        double lat,
        double lng
) {
    public static TestCapsuleResponse of(RadishCapsule radishCapsule) {
        return new TestCapsuleResponse(
                radishCapsule.getId(), radishCapsule.getAddressName(), radishCapsule.getDescription(),
                radishCapsule.getDescription(), radishCapsule.getImgUrl(), radishCapsule.isHarvested(),
                radishCapsule.getMember().getId(), radishCapsule.getLat(), radishCapsule.getLng()
        );
    }
}
