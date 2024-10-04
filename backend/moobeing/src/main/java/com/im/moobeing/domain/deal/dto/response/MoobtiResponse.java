package com.im.moobeing.domain.deal.dto.response;

import com.im.moobeing.domain.deal.dto.CategoryPercentDto;
import com.im.moobeing.domain.deal.dto.GetCategoryListDto;
import java.util.ArrayList;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MoobtiResponse {
    private String type;
    private String description;
    private ArrayList<CategoryPercentDto> categories;

    public static MoobtiResponse of(String type, String description, ArrayList<CategoryPercentDto> categories) {
        return MoobtiResponse.builder()
                             .type(type)
                             .description(description)
                             .categories(categories)
                             .build();
    }
}

