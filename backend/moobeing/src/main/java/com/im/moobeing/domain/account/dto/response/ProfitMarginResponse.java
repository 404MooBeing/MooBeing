package com.im.moobeing.domain.account.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.im.moobeing.domain.account.dto.LoanListDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ProfitMarginResponse {
    private Long accountLeftMoney;

    @JsonProperty("LoanList")
    private List<LoanListDto> loanList;

    public static ProfitMarginResponse of(Long accountLeftMoney, List<LoanListDto> loanList) {
        return ProfitMarginResponse.builder()
                .accountLeftMoney(accountLeftMoney)
                .loanList(loanList)
                .build();
    }
}
