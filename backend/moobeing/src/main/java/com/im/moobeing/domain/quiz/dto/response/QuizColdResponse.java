package com.im.moobeing.domain.quiz.dto.response;

import com.im.moobeing.domain.quiz.entity.QuizType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuizColdResponse {
	private boolean isExist;
	private String quizType;

	public static QuizColdResponse from(Boolean isExist, QuizType quizType) {
		if (!isExist)
			return new QuizColdResponse(false, null);
		return new QuizColdResponse(isExist, quizType.getDisplayName());
	}
}
