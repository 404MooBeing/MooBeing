package com.im.moobeing.domain.member.dto.response;

import com.im.moobeing.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberResponse {
    private String name;

    //todo 필요 있는지 체크하기.
    public static MemberResponse of(final Member member) {
        return MemberResponse.builder()
                .name(member.getName())
                .build();
    }
}
