package com.im.moobeing.domain.member.dto.response;

import com.im.moobeing.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberLoginResponse {
    private String name;
    private String radishName;
    private String radishRank;
    private String radishImageUrl;

    public static MemberLoginResponse of(final Member member, String radishName,String radishRank, String radishImageUrl) {
        return MemberLoginResponse.builder()
                .name(member.getName())
                .radishName(radishName)
                .radishRank(radishRank)
                .radishImageUrl(radishImageUrl)
                .build();
    }
}
