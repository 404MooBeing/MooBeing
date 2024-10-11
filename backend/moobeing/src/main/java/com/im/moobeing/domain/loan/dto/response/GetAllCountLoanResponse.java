package com.im.moobeing.domain.loan.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetAllCountLoanResponse {
    private int allLoanCnt;
    private int completedCnt;
    private boolean showButton;

    public static GetAllCountLoanResponse of(int allLoanCnt, int completedCnt, boolean showButton) {
        return GetAllCountLoanResponse.builder()
                .allLoanCnt(allLoanCnt)
                .completedCnt(completedCnt)
                .showButton(showButton)
                .build();
    }
}
