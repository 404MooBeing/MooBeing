package com.im.moobeing.domain.alarm.entity;

import lombok.Getter;

@Getter
public enum AlarmIconType {
    MOOBTI("MooBTI 확인", "이번 달 소비내역 분석을 할 수 있어요."),
    QUIZ("금융 퀴즈 생성", "이번 달 소비에 대한 퀴즈를 맞춰보세요."),
    QUIZ_ECONOMY("금융 상식 퀴즈 생성", "오늘의 금융 상식 퀴즈를 맞춰보세요."),
    TIME("타임 무 알림", "강남에서 심은 타임무를 수확할 시간이예요.");

    private final String title;
    private final String message;

    AlarmIconType(String title, String message) {
        this.title = title;
        this.message = message;
    }
}

