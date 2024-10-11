package com.im.moobeing.domain.quiz.dto.response;

import java.time.LocalDateTime;

import com.im.moobeing.domain.quiz.entity.Quiz;
import lombok.Getter;


@Getter
public class QuizDetailResponse extends QuizResponse {
	final private Boolean isCorrect;
	final private LocalDateTime endedAt;
	final private Integer example;

	public QuizDetailResponse(Long quizId, LocalDateTime createdDate, String status, Boolean isCorrect,
		LocalDateTime endedAt, Integer example) {
		super(quizId, createdDate, status);
		this.isCorrect = isCorrect;
		this.endedAt = endedAt;
		this.example = example;
	}

	public static QuizDetailResponse from(Quiz quiz) {
		return new QuizDetailResponse(quiz.getQuizId(), quiz.getCreatedDate(), quiz.getStatus().getDisplayName(),
			quiz.getIsCorrect(), quiz.getEndedAt(), quiz.getExample());
	}
}
