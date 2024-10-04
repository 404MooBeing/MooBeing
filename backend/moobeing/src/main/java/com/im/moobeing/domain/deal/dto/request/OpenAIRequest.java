package com.im.moobeing.domain.deal.dto.request;

import com.im.moobeing.global.entity.OpenAIRole;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class OpenAIRequest {
    private OpenAIRole role;
    String content;
}
