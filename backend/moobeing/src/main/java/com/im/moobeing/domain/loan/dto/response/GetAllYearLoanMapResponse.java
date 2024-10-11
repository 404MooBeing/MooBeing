package com.im.moobeing.domain.loan.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.im.moobeing.domain.loan.dto.GetAllYearLoanMapDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetAllYearLoanMapResponse {
	@JsonProperty("getAllJourneyList")
	private List<GetAllYearLoanMapDto> getAllLoanMapDtoList;

	public static GetAllYearLoanMapResponse of(List<GetAllYearLoanMapDto> getAllYearLoanMapDtos) {
		return GetAllYearLoanMapResponse.builder()
			.getAllLoanMapDtoList(getAllYearLoanMapDtos)
			.build();
	}
}
