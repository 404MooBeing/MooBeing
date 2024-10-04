package com.im.moobeing.domain.deal.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.im.moobeing.domain.deal.dto.CategoryPercentDto;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MoobtiResponse {
    private String type;
    private String description;
    private List<CategoryPercentDto> categories;

    @JsonCreator
    public MoobtiResponse(
        @JsonProperty("type") String type,
        @JsonProperty("description") String description,
        @JsonProperty("categories") List<CategoryPercentDto> categories) {
        this.type = type;
        this.description = description;
        this.categories = categories;
    }
}
