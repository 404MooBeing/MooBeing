package com.im.moobeing.domain.loan.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.im.moobeing.domain.loan.entity.MemberLoan;

public interface MemberLoanRepository extends JpaRepository<MemberLoan, Long> {

	// Member의 ID로 MemberLoan을 조회하는 메서드 정의
	List<MemberLoan> findAllByMemberId(Long memberId);
	Optional<MemberLoan> findByMemberIdAndLoanProductName(Long memberId, String loanProductName);

	List<MemberLoan> findAllByMemberIdAndStartYearAndStartMonth(Long memberId, Integer year, Integer month);
}