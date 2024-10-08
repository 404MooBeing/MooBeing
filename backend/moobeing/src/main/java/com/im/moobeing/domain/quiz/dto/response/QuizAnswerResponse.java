package com.im.moobeing.domain.quiz.dto.response;

import com.im.moobeing.domain.quiz.entity.Quiz;

public record QuizAnswerResponse(
		boolean isCorrect,
		int answer,
		String message
) {
	public static QuizAnswerResponse from(Quiz quiz,String message) {
		return new QuizAnswerResponse(quiz.getIsCorrect(), quiz.getAnswer(), message);
	}
}
