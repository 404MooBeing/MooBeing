package com.im.moobeing.domain.member.dto.response;

import com.im.moobeing.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberCreateResponse {
    private String name;

    public static MemberCreateResponse of(final Member member) {
        return MemberCreateResponse.builder()
                .name(member.getName())
                .build();
    }
}
