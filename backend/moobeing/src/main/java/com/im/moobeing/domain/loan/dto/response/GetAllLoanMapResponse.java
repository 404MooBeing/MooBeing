package com.im.moobeing.domain.loan.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.im.moobeing.domain.loan.dto.GetAllLoanMapDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetAllLoanMapResponse {
	@JsonProperty("getAllJourneyList")
	private List<GetAllLoanMapDto> getAllLoanMapDtoList;

	public static GetAllLoanMapResponse of(List<GetAllLoanMapDto> allLoanMapDtoList) {
		return GetAllLoanMapResponse.builder()
			.getAllLoanMapDtoList(allLoanMapDtoList)
			.build();
	}
}
