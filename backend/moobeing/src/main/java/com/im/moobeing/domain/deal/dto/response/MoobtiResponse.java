package com.im.moobeing.domain.deal.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.im.moobeing.domain.deal.dto.CategoryPercentDto;
import com.im.moobeing.domain.deal.dto.MoobtiCharacterDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MoobtiResponse {
    private MoobtiCharacterDto character;
    private List<CategoryPercentDto> categories;
    private String name;
    private Integer month;


}
