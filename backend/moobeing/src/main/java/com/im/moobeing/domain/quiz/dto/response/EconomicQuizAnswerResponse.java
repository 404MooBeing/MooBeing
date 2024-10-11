package com.im.moobeing.domain.quiz.dto.response;

import com.im.moobeing.domain.quiz.entity.Quiz;
import com.im.moobeing.domain.quiz.entity.QuizData;
import lombok.Getter;

@Getter
public class EconomicQuizAnswerResponse {
    private Long quizId;
    private Boolean isCorrect;
    private String explanation;
    private String message;

    private EconomicQuizAnswerResponse(Long quizId, Boolean isCorrect, String explanation, String message) {
        this.quizId = quizId;
        this.isCorrect = isCorrect;
        this.explanation = explanation;
        this.message = message;
    }

    public static EconomicQuizAnswerResponse from(Quiz quiz, QuizData quizData) {
        String[] messages = {
                "조금 더 공부해보세요! 경제 용어는 자산을 관리하는 데 중요한 역할을 합니다.",
                "괜찮아요, 실수는 배움의 기회입니다. 다음번엔 더 나아질 거예요!",
                "경제 지식은 작은 차이가 큰 결과를 만듭니다. 조금 더 살펴보세요!",
                "아쉽네요! 이번 기회에 해당 용어를 다시 한번 학습해보세요.",
                "배움은 꾸준히 해야 합니다. 경제 용어에 대한 이해는 자산을 불릴 수 있는 힘이에요!",
                "이번에는 틀렸지만 괜찮아요! 틀린 부분을 복습하면서 경제 용어에 더 익숙해지세요.",
                "경제 용어를 잘 알면 금융 생활에서 더 많은 이점을 얻을 수 있습니다. 복습해보세요!",
                "틀린 답변도 괜찮아요! 이 기회에 해당 용어를 확실히 이해해보세요.",
                "경제 지식을 쌓는 과정은 꾸준함이 중요합니다. 차근차근 공부해 나가세요!",
                "이번에는 틀렸지만, 실수를 통해 더 많은 것을 배울 수 있습니다. 계속 도전하세요!"
        };

        return new EconomicQuizAnswerResponse(
                quiz.getQuizId(),
                quiz.getIsCorrect(),
                quizData.getExplanation(),
                messages[(int) (Math.random() * messages.length)]
        );
    }
}
