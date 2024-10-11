package com.im.moobeing.domain.quiz.entity;

import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BadRequestException;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public enum QuizInputAnswer {
	UP("UP"),
	DOWN("DOWN"),
	NONE("NONE");

	private String displayName;
	private static final Map<String, QuizInputAnswer> convertor = Arrays.stream(QuizInputAnswer.values())
		.collect(Collectors.toMap(QuizInputAnswer::getDisplayName, Function.identity()));

	QuizInputAnswer(String displayName) {
		this.displayName = displayName;
	}

	public String getDisplayName() {
		return displayName;
	}

	public static QuizInputAnswer from(String type) {
		if (!convertor.containsKey(type)) {
			throw new BadRequestException(ErrorCode.INVALID_STATUS_TYPE);
		}
		return convertor.get(type);
	}
}
