package com.im.moobeing.domain.quiz.dto.response;

import com.im.moobeing.domain.quiz.entity.Quiz;
import com.im.moobeing.domain.quiz.entity.QuizData;
import lombok.Getter;

@Getter
public class EconomicQuizDetailResponse {
    private Long quizId;
    private String question;

    private EconomicQuizDetailResponse(Long quizId,
                                       String question) {
        this.quizId = quizId;
        this.question = question;
    }

    public static EconomicQuizDetailResponse from(Quiz quiz, QuizData quizData) {
        return new EconomicQuizDetailResponse(
                quiz.getQuizId(),
                quizData.getQuestion()
        );
    }
}
