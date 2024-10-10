package com.im.moobeing.domain.quiz.dto.response;

import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.quiz.entity.Quiz;
import com.im.moobeing.domain.quiz.entity.QuizStatus;
import com.im.moobeing.domain.quiz.entity.QuizType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TestQuizResponse {
    private Long quizId;
    private Long memberId;
    private QuizStatus status;
    private QuizType quizType;
    private Boolean isCorrect;
    private int answer;
    private int example;
    private LocalDateTime endedAt;
    private Long quizDataId;

    public static TestQuizResponse of(Quiz quiz) {
        return TestQuizResponse.builder()
                .quizId(quiz.getQuizId())
                .memberId(quiz.getMember().getId())
                .status(quiz.getStatus())
                .quizType(quiz.getQuizType())
                .isCorrect(quiz.getIsCorrect())
                .answer(quiz.getAnswer())
                .example(quiz.getExample())
                .endedAt(quiz.getEndedAt())
                .quizDataId(quiz.getQuizDataId())
                .build();
    }
}
