package com.im.moobeing.domain.deal.entity;

import lombok.Getter;

@Getter
public enum DealCategory {
    FOOD("식비"),
    HEALTH("건강"),
    CULTURE("문화"),
    LOAN("대출"),
    ENTERTAINMENT("유흥"),
    TRANSPORT("교통")
    ;

    private final String description;

    DealCategory(String description) {
        this.description = description;
    }
}
