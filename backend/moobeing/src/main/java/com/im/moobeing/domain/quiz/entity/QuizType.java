package com.im.moobeing.domain.quiz.entity;

import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BadRequestException;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public enum QuizType {
    EXPENSE("expense"),
    ECONOMY("economy");

    private String displayName;
    private static final Map<String, QuizStatus> convertor = Arrays.stream(QuizStatus.values())
            .collect(Collectors.toMap(QuizStatus::getDisplayName, Function.identity()));

    QuizType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static QuizStatus from(String type) {
        if (!convertor.containsKey(type)) {
            throw new BadRequestException(ErrorCode.INVALID_STATUS_TYPE);
        }
        return convertor.get(type);
    }
}
