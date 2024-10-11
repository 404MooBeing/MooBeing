package com.im.moobeing.domain.radish.entity;

import lombok.Getter;

@Getter
public enum CapsuleType {

    SMALL_RADISH("작은무", 20),
    MEDIUM_RADISH("중간무", 40),
    LARGE_RADISH("큰무", 180);

    private final String displayName;
    private final int harvestDays;

    CapsuleType(String displayName, int harvestDays) {
        this.displayName = displayName;
        this.harvestDays = harvestDays;
    }
}