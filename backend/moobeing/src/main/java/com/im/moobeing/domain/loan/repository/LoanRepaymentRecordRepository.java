package com.im.moobeing.domain.loan.repository;

import com.im.moobeing.domain.loan.entity.LoanRepaymentRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepaymentRecordRepository extends JpaRepository<LoanRepaymentRecord, Long> {
	List<LoanRepaymentRecord> findAllByMemberLoanId(Long memberLoanId);

    // 이 날짜에 상환한 내역이 있는 지 확인해주는 query 문 작성
    boolean existsByMemberLoanIdAndYearAndMonth(Long id, int year, int month);

    // 특정 MemberLoan ID와 연도에 해당하는 모든 상환 기록을 가져오는 메서드
    List<LoanRepaymentRecord> findAllByMemberLoanIdAndYear(Long memberLoanId, int year);
}
