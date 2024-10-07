package com.im.moobeing.domain.deal.dto;

import lombok.Builder;

@Builder
public record MoobtiCharacterDto (String imageUrl, String type, String name, String description){}
