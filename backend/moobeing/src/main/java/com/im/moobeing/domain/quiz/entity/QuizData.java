package com.im.moobeing.domain.quiz.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Table(name = "quiz_data")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class QuizData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String word;

    @Column
    private String question;

    @Column
    private Boolean answer;

    @Column
    private String explanation;

    @Column(name = "quiz_date")
    private LocalDate quizDate;
}
