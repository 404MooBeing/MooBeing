package com.im.moobeing.domain.member.repository;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class NicknameWordRepository {
    private static final List<String> ADJECTIVES = Arrays.asList(
            "귀여운", "사랑스러운", "멋진", "용감한", "똑똑한", "활기찬", "즐거운", "재치있는",
            "상냥한", "발랄한", "화려한", "고요한", "신비로운", "차분한", "우아한", "깜찍한",
            "당당한", "친절한", "열정적인", "부드러운", "강인한", "매혹적인", "흥미로운", "재미있는",
            "생기있는", "신나는", "다정한", "영리한", "소중한", "행복한", "참신한", "창의적인",
            "놀라운", "자유로운", "평온한", "배려하는", "따뜻한", "친근한", "호기심많은", "낭만적인"
    );

    private static final List<String> RADISH_WORDS = Arrays.asList(
            "무신사", "무야호", "물구나무", "무급휴가", "무산소", "무한리필", "무더위", "무용지물",
            "무지개", "무제한", "무상보증", "무명", "무심코", "무모한", "무덤덤", "무궁화",
            "무공해", "무균실", "무직자", "무선인터넷", "무법자", "무한도전", "무관심", "무기력",
            "무한사랑", "무통장입금", "무결점", "무언가", "무작정", "무지방", "무턱대고", "무감각"
    );

    private NicknameWordRepository() {
    }

    public static String getRandomNickname() {
        Random random = new Random();
        return ADJECTIVES.get(random.nextInt(ADJECTIVES.size())) + " " + RADISH_WORDS.get(random.nextInt(RADISH_WORDS.size()));
    }
}
