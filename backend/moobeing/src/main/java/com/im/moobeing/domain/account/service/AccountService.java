package com.im.moobeing.domain.account.service;

import com.im.moobeing.domain.account.dto.GetAccountDto;
import com.im.moobeing.domain.account.dto.LoanListDto;
import com.im.moobeing.domain.account.dto.request.SendAccountRequest;
import com.im.moobeing.domain.account.dto.response.GetAccountResponse;
import com.im.moobeing.domain.account.dto.response.ProfitMarginResponse;
import com.im.moobeing.domain.account.dto.response.SendAccountResponse;
import com.im.moobeing.domain.account.entity.Account;
import com.im.moobeing.domain.account.repository.AccountRepository;
import com.im.moobeing.domain.deal.repository.ExpenseRepository;
import com.im.moobeing.domain.loan.entity.LoanProduct;
import com.im.moobeing.domain.loan.entity.LoanRepaymentRecord;
import com.im.moobeing.domain.loan.entity.MemberLoan;
import com.im.moobeing.domain.loan.repository.LoanProductRepository;
import com.im.moobeing.domain.loan.repository.LoanRepaymentRecordRepository;
import com.im.moobeing.domain.loan.repository.MemberLoanRepository;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountService {
	private final AccountRepository accountRepository;
	private final MemberLoanRepository memberLoanRepository;
	private final LoanRepaymentRecordRepository loanRepaymentRecordRepository;
	private final ExpenseRepository expenseRepository;
	private final LoanProductRepository loanProductRepository;

	public GetAccountResponse getAccount(Member member) {
		List<Account> accountList =  accountRepository.findByMemberId(member.getId());

		List<GetAccountDto> getAccountDtoList = new ArrayList<>();

		for (Account account : accountList) {
			getAccountDtoList.add(
				GetAccountDto.of(account)
			);
		}

		return GetAccountResponse.of(getAccountDtoList);
	}

	@Transactional
	public SendAccountResponse sendAccount(Member member, SendAccountRequest sendAccountRequest) {
		// 여기서 계좌 번호를 찾아서 balance를 빼고
		Account account = accountRepository.findByMemberIdAndAccountNum(member.getId(), sendAccountRequest.getAccountNum())
			.orElseThrow(() -> new BusinessException(ErrorCode.AC_NOT_FOUND));

		Long oldAccountBalance = account.getAccountBalance() - sendAccountRequest.getMoney();

		if(oldAccountBalance < 0) {
			throw new BusinessException(ErrorCode.AC_NOT_HAVE_ENOUGH);
		}

		account.setAccountBalance(oldAccountBalance);

		// 여기서 대출 번호를 찾아서 remain_balance를 빼면된다. (member와 대출 상품이름으로 찾는다)
		MemberLoan memberLoan = memberLoanRepository.findByMemberIdAndLoanProductName(member.getId(), sendAccountRequest.getLoanName())
			.orElseThrow(() -> new BusinessException(ErrorCode.ML_NOT_FOUND));

		memberLoan.setRemainingBalance(memberLoan.getRemainingBalance() - sendAccountRequest.getMoney());

		Long oldLoanBalance = memberLoan.getRemainingBalance() - sendAccountRequest.getMoney();

		if(oldLoanBalance < 0) {
			throw new BusinessException(ErrorCode.ML_OVER_BALANCE);
		}

		// 현재 시간 가져오기
		LocalDateTime now = LocalDateTime.now();

		// 대출 상환 기록 추가
		LoanRepaymentRecord loanRepaymentRecord = LoanRepaymentRecord.builder()
			.memberLoanId(memberLoan.getId())
			.repaymentBalance(sendAccountRequest.getMoney())
			.repaymentDate(Timestamp.valueOf(now)) // 현재 시간 설정
			.year(now.getYear()) // 현재 년도 설정
			.month(now.getMonthValue()) // 현재 월 설정
			.day(now.getDayOfMonth()) // 현재 일 설정
			.build();

		// 대출 상환 기록 저장
		loanRepaymentRecordRepository.save(loanRepaymentRecord);

		return SendAccountResponse.of(oldAccountBalance);
	}

	public ProfitMarginResponse profitMargin(Member member) {
		// 저번 달 지출 비용 확인하기. 현재 시간을
		int beforeYear = LocalDateTime.now().getYear();
		int beforeMonth = LocalDateTime.now().getMonthValue() - 1;

		if (beforeMonth == 0){
			beforeMonth = 12;
			beforeYear = beforeYear - 1;
		}

		Long remainder = member.getMonthAver() - expenseRepository.findTotalPriceByYearAndMonth(beforeYear, beforeMonth);

		// 만약 지난달에 초과 지출하거나,
		if (remainder < 0){
			return ProfitMarginResponse.of(0L,null);
		}

		List<MemberLoan> memberLoan = memberLoanRepository.findAllByMemberId(member.getId());

		List<LoanListDto> loanList = new ArrayList<>();

		for (MemberLoan loan : memberLoan) {
			Long canPay = loan.getRemainingBalance() - remainder;
			LoanProduct loanProduct = loanProductRepository.findByLoanName(loan.getLoanProductName())
					.orElseThrow(()-> new BusinessException(ErrorCode.LP_NOT_FOUND));
			if (canPay <= 0){
				canPay = loan.getRemainingBalance();
			}
			Long interestBalance = loanInterestSavingsCalculation(loan.getRemainingBalance(), loanProduct.getInterestRate(), Integer.parseInt(String.valueOf(loanProduct.getLoanPeriod())), canPay);

			loanList.add(LoanListDto.of(loan.getLoanProductName(), interestBalance));
		}

		return ProfitMarginResponse.of(remainder, loanList);
	}

	private static Long loanInterestSavingsCalculation(Long principal, double annualInterestRate, int loanTermMonths, Long extraPayment) {
		annualInterestRate = annualInterestRate / 100;
		// 월 이자율 계산
		double monthlyInterestRate = annualInterestRate / 12;

		// 원금 일부 상환 전 월 상환액 계산
		double monthlyPayment = calculateMonthlyPayment(principal, monthlyInterestRate, loanTermMonths);

		// 원금 일부 상환 전 총 이자 비용 계산
		double totalInterestBefore = calculateTotalInterest(monthlyPayment, loanTermMonths, principal);

		// 원금 일부 상환 후 새로운 원금 계산
		double newPrincipal = principal - extraPayment;

		// 원금 일부 상환 후 월 상환액 재계산 (대출 기간은 유지)
		double newMonthlyPayment = calculateMonthlyPayment(newPrincipal, monthlyInterestRate, loanTermMonths);

		// 원금 일부 상환 후 총 이자 비용 계산
		double totalInterestAfter = calculateTotalInterest(newMonthlyPayment, loanTermMonths, newPrincipal);

		// 이자 절감액 계산
		Long interestSavings = (long) (totalInterestBefore - totalInterestAfter);

		return interestSavings;
	}

	// 월 상환액 계산 함수
	public static double calculateMonthlyPayment(double principal, double monthlyInterestRate, int loanTermMonths) {
		return principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));
	}

	// 총 이자 비용 계산 함수
	public static double calculateTotalInterest(double monthlyPayment, int loanTermMonths, double principal) {
		return (monthlyPayment * loanTermMonths) - principal;
	}
}
