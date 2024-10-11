package com.im.moobeing.domain.quiz.dto.response;

import java.time.LocalDateTime;

import com.im.moobeing.domain.quiz.entity.Quiz;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuizResponse {
	private Long quizId;
	private LocalDateTime createdDate;
	private String status;

	public static QuizResponse from(Quiz quiz) {
		return new QuizResponse(quiz.getQuizId(), quiz.getCreatedDate(), quiz.getStatus().getDisplayName());
	}
}
