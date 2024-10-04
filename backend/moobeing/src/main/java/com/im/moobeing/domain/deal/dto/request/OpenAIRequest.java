package com.im.moobeing.domain.deal.dto.request;

import com.im.moobeing.global.entity.OpenAIRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OpenAIRequest {
    private OpenAIRole role;
    String content;
}
