package com.im.moobeing.domain.deal.repository;

import com.im.moobeing.domain.deal.entity.Deal;
import com.im.moobeing.domain.member.entity.Member;
import feign.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Long> {
    // N+1 처리를 위한 fetch join 필(category)
    @Query("SELECT d FROM Deal d JOIN FETCH d.member WHERE d.member = :member AND YEAR(d.createdDate) = :year AND MONTH(d.createdDate) = :month")
    List<Deal> findAllByMemberAndYearAndMonth(@Param("member") Member member, @Param("year") int year, @Param("month") int month);

    @Query("SELECT d FROM Deal d JOIN FETCH d.member WHERE d.member = :member AND YEAR(d.createdDate) = :year AND MONTH(d.createdDate) = :month AND DAY(d.createdDate) = :day")
    List<Deal> findAllByMemberAndYearAndMonthAndDay(@Param("member") Member member, @Param("year") int year, @Param("month") int month, @Param("day") int day);

    @Query("SELECT d FROM Deal d WHERE d.member = :member AND d.createdDate BETWEEN :startDate AND :endDate")
    List<Deal> findAllByMemberAndDateRange(@Param("member") Member member,
                                           @Param("startDate") LocalDateTime startDate,
                                           @Param("endDate") LocalDateTime endDate);

    @Query("SELECT COALESCE(SUM(d.price), 0) FROM Deal d WHERE d.member = :member AND YEAR(d.createdDate) = :year AND MONTH(d.createdDate) = :month")
    int findTotalPriceByMemberAndYearAndMonth(@Param("member") Member member,
                                              @Param("year") int year,
                                              @Param("month") int month);

    @Query("SELECT d FROM Deal d WHERE d.account.accountId = :accountId AND d.member.id = :memberId " +
            "AND d.createdDate BETWEEN :startDate AND :endDate " +
            "AND (:transactionType = 'all' OR (:transactionType = 'deposit' AND d.price > 0) " +
            "OR (:transactionType = 'withdrawal' AND d.price < 0))" +
            "ORDER BY d.createdDate DESC")
    List<Deal> findAllByAccountAndDateRange(@Param("accountId") Long accountId,
                                            @Param("memberId") Long memberId,
                                            @Param("startDate") LocalDateTime startDate,
                                            @Param("endDate") LocalDateTime endDate,
                                            @Param("transactionType") String transactionType,
                                            Pageable pageable);
}
