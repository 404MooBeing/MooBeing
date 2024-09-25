package com.im.moobeing.domain.expense.repository;

import com.im.moobeing.domain.expense.entity.Deal;
import com.im.moobeing.domain.member.entity.Member;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Deal, Long> {
	//TODO : N+1처리를 위한 fetch join 필(category)

    @Query("SELECT e FROM Deal e JOIN FETCH e.expenseCategory WHERE e.member = :member AND YEAR(e.expenseDate) = :year AND MONTH(e.expenseDate) = :month")
    List<Deal> findAllByMemberAndYearAndMonth(@Param("member") Member member, @Param("year") int year, @Param("month") int month);

    List<Deal> findAllByExpenseDateBetween(LocalDateTime expenseDate, LocalDateTime expenseDate2);

    @Query("SELECT COALESCE(SUM(e.price), 0) FROM Deal e WHERE YEAR(e.expenseDate) = :year AND MONTH(e.expenseDate) = :month")
    int findTotalPriceByYearAndMonth(@Param("year") int year, @Param("month") int month);

}
