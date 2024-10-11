package com.im.moobeing.domain.account.dto.response;

import com.im.moobeing.domain.account.dto.GetAccountDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetAccountResponse {
	private List<GetAccountDto> getAccountDtoList;

	public static GetAccountResponse of(List<GetAccountDto> getAccountDtoList) {
		return GetAccountResponse.builder()
			.getAccountDtoList(getAccountDtoList)
			.build();
	}
}
