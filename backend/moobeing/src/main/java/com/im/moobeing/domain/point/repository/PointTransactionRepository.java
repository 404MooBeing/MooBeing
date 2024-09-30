package com.im.moobeing.domain.point.repository;

import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.point.entity.PointTransaction;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PointTransactionRepository extends JpaRepository<PointTransaction, Long> {
    List<PointTransaction> findAllByMemberOrderByCreatedAtDesc(Member member, Pageable pageable);
    Optional<PointTransaction> findTopByMemberOrderByCreatedAtDesc(Member member);
    @Query("SELECT pt FROM PointTransaction pt WHERE pt.member.id = :memberId " +
            "AND pt.createdAt BETWEEN :startDate AND :endDate " +
            "AND (:transactionType = 'all' OR (:transactionType = 'deposit' AND pt.amount > 0) " +
            "OR (:transactionType = 'withdrawal' AND pt.amount < 0)) " +
            "ORDER BY pt.createdAt DESC")
    List<PointTransaction> findAllByMemberAndDateRange(
            @Param("memberId") Long memberId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("transactionType") String transactionType,
            Pageable pageable);
}
