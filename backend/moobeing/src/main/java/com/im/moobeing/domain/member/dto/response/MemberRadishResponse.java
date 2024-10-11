package com.im.moobeing.domain.member.dto.response;

import com.im.moobeing.domain.member.dto.MemberRadishDTO;
import com.im.moobeing.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MemberRadishResponse {
    List<MemberRadishDTO> memberRadishes;

    public static MemberRadishResponse of(final Member member) {
        List<MemberRadishDTO> memberRadishDTOList = member.getMemberRadishes().stream()
                .map(MemberRadishDTO::of)
                .toList();

        return MemberRadishResponse.builder()
                .memberRadishes(memberRadishDTOList)
                .build();
    }
}
