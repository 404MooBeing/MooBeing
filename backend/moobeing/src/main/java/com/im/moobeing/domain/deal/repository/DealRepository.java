package com.im.moobeing.domain.deal.repository;

import com.im.moobeing.domain.deal.entity.Deal;
import com.im.moobeing.domain.member.entity.Member;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Long> {
    // N+1 처리를 위한 fetch join 필(category)
    @Query("SELECT d FROM Deal d JOIN FETCH d.member WHERE d.member = :member AND YEAR(d.createdDate) = :year AND MONTH(d.createdDate) = :month")
    List<Deal> findAllByMemberAndYearAndMonth(@Param("member") Member member, @Param("year") int year, @Param("month") int month);

    List<Deal> findAllDealByCreatedDateBetween(LocalDateTime expenseDate, LocalDateTime expenseDate2);

    @Query("SELECT COALESCE(SUM(d.price), 0) FROM Deal d WHERE YEAR(d.createdDate) = :year AND MONTH(d.createdDate) = :month")
    int findTotalPriceByYearAndMonth(@Param("year") int year, @Param("month") int month);
}
