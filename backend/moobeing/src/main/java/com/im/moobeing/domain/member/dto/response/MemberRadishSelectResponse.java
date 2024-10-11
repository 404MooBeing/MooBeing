package com.im.moobeing.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberRadishSelectResponse {
    private String radishName;
    private String radishRank;
    private String radishImageUrl;

    public static MemberRadishSelectResponse of(String radishName, String radishRank, String radishImageUrl) {
        return MemberRadishSelectResponse.builder()
                .radishName(radishName)
                .radishRank(radishRank)
                .radishImageUrl(radishImageUrl)
                .build();
    }
}
