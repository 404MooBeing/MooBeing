package com.im.moobeing.domain.quiz.repository;

import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.quiz.entity.Quiz;
import com.im.moobeing.domain.quiz.entity.QuizStatus;
import com.im.moobeing.domain.quiz.entity.QuizType;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


public interface QuizRepository extends JpaRepository<Quiz, Long> {

    void deleteByStatus(QuizStatus status);

    @Modifying
    @Transactional
    @Query("UPDATE Quiz e SET e.status = :status")
    void updateAllByStatus(QuizStatus status);

    Optional<Quiz> findByStatusAndMember(QuizStatus status, Member member);

    List<Quiz> findAllByMember(Member member);

    Optional<Quiz> findByQuizId(Long quizId);

    /**
     * @param member 조회한 회원
     * @param status 참여하지 않은 퀴즈가 있는지
     * @return 참여하지 않은 퀴즈가 있는지 여부
     */
    boolean existsByMemberAndStatus(Member member, QuizStatus status);
    Optional<Quiz> findByMemberAndQuizDataId(Member member, Long quizDataId);
    Optional<Quiz> findByStatusAndMemberAndQuizType(QuizStatus quizStatus, Member member, QuizType quizType);
}
