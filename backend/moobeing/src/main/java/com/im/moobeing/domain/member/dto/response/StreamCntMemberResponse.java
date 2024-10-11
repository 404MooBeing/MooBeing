package com.im.moobeing.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StreamCntMemberResponse {
    private int streamCnt;
    private long coin;

    public static StreamCntMemberResponse of (int streamCnt){
        return StreamCntMemberResponse.builder()
                .streamCnt(streamCnt)
                .coin(0)
                .build();
    }

    public static StreamCntMemberResponse of (long coin, int streamCnt){
        return StreamCntMemberResponse.builder()
                .coin(coin)
                .streamCnt(streamCnt)
                .build();
    }
}
