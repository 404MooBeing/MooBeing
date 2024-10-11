package com.im.moobeing.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberCheckEmailResponse {
    private boolean possibility;

    public static MemberCheckEmailResponse of(final boolean possibility) {
        return MemberCheckEmailResponse.builder()
                .possibility(possibility)
                .build();
    }
}
