package com.im.moobeing.domain.quiz.repository;

import com.im.moobeing.domain.quiz.entity.QuizData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface QuizDataRepository extends JpaRepository<QuizData, Long> {
    Optional<QuizData> findByQuizDate(LocalDate quizDate);
}
