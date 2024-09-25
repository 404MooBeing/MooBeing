package com.im.moobeing.domain.deal.repository;

import com.im.moobeing.domain.deal.entity.Deal;
import com.im.moobeing.domain.member.entity.Member;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Long> {
	//TODO : N+1처리를 위한 fetch join 필(category)

    @Query("SELECT e FROM Deal e JOIN FETCH e.dealCategory WHERE e.member = :member AND YEAR(e.createdDate) = :year AND MONTH(e.createdDate) = :month")
    List<Deal> findAllByMemberAndYearAndMonth(@Param("member") Member member, @Param("year") int year, @Param("month") int month);

    List<Deal> findAllDealByCreatedDateBetween(LocalDateTime expenseDate, LocalDateTime expenseDate2);

    @Query("SELECT COALESCE(SUM(e.price), 0) FROM Deal e WHERE YEAR(e.createdDate) = :year AND MONTH(e.createdDate) = :month")
    int findTotalPriceByYearAndMonth(@Param("year") int year, @Param("month") int month);

}
