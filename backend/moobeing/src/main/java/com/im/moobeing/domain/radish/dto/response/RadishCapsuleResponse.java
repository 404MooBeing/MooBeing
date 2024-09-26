package com.im.moobeing.domain.radish.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RadishCapsuleResponse {
    private Long id;
    private String date;
    private String title;
    private String amount;
    private String imageUrl;
    private String iconUrl;
    private String content;
}
