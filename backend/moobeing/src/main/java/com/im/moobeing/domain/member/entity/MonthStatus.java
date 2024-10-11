package com.im.moobeing.domain.member.entity;

import lombok.Getter;

@Getter
public enum MonthStatus {
    FALSE("FALSE"),
    TRUE("TRUE"),
    DONE("DONE");

    private final String status;

    MonthStatus(String status) {
        this.status = status;
    }
}
