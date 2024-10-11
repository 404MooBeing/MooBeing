package com.im.moobeing.domain.member.dto;

import com.im.moobeing.domain.member.entity.MemberRadish;
import com.im.moobeing.domain.radish.entity.Radish;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class MemberRadishDTO {
    private Long radishId;
    private String radishName;
    private String radishRank;
    private Long radishNumber;
    private String radishImageUrl;
    private LocalDateTime radishCreateTime;

    public static MemberRadishDTO of(MemberRadish memberRadish) {
        Radish radish = memberRadish.getRadish();
        return MemberRadishDTO.builder()
                .radishId(radish.getId())
                .radishName(radish.getRadishName())
                .radishRank(radish.getRadishRank())
                .radishNumber(memberRadish.getRadishNumber())
            .radishImageUrl(radish.getRadishImageUrl())
                .radishCreateTime(memberRadish.getCreatedDate())
                .build();
    }
}

