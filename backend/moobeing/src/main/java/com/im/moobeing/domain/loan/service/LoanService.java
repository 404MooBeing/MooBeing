package com.im.moobeing.domain.loan.service;

import com.im.moobeing.domain.loan.dto.GetAllLoanMapDto;
import com.im.moobeing.domain.loan.dto.GetAllYearLoanMapDto;
import com.im.moobeing.domain.loan.dto.GetMemberLoanDto;
import com.im.moobeing.domain.loan.dto.response.*;
import com.im.moobeing.domain.loan.entity.AverageLoanRepaymentRecord;
import com.im.moobeing.domain.loan.entity.LoanProduct;
import com.im.moobeing.domain.loan.entity.LoanRepaymentRecord;
import com.im.moobeing.domain.loan.entity.MemberLoan;
import com.im.moobeing.domain.loan.repository.AverageLoanRepaymentRecordRepository;
import com.im.moobeing.domain.loan.repository.LoanProductRepository;
import com.im.moobeing.domain.loan.repository.LoanRepaymentRecordRepository;
import com.im.moobeing.domain.loan.repository.MemberLoanRepository;
import com.im.moobeing.domain.member.dto.response.AddMemberRadishResponse;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.member.entity.MonthStatus;
import com.im.moobeing.domain.member.repository.MemberRepository;
import com.im.moobeing.domain.member.service.MemberService;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LoanService {

	private final LoanRepaymentRecordRepository loanRepaymentRecordRepository;
	private final LoanProductRepository loanProductRepository;
	private final AverageLoanRepaymentRecordRepository averageLoanRepaymentRecordRepository;
	private final MemberLoanRepository memberLoanRepository;
	private final MemberService memberService;

	private static final int CURRENT_YEAR = 2024;
	private final MemberRepository memberRepository;

	public GetMemberLoanResponse getMemberLoan(Member member, String sort) {
		// Member ID로 MemberLoan을 조회
		List<MemberLoan> memberLoan = memberLoanRepository.findAllByMemberId(member.getId());

		List<GetMemberLoanDto> getMemberLoanDtoList = new ArrayList<>();

		Long totalLoanAmount = 0L;

		for (MemberLoan loan : memberLoan) {
			if(loan.getRemainingBalance() == 0){
				continue;
			}

			LoanProduct product = loanProductRepository.findByLoanName(loan.getLoanProductName())
				.orElseThrow(() -> new BusinessException(ErrorCode.LP_NOT_FOUND));

			getMemberLoanDtoList.add(GetMemberLoanDto.of(loan, product, member.getIsGoodMember()));

			totalLoanAmount += loan.getRemainingBalance();
		}

		if (sort.equals("rate")) {
			getMemberLoanDtoList.sort(Comparator.comparing(GetMemberLoanDto::getInterestRate).reversed());
		} else if (sort.equals("amount")) {
			getMemberLoanDtoList.sort(Comparator.comparing(GetMemberLoanDto::getRemainingBalance).reversed());
		}

		return GetMemberLoanResponse.of(totalLoanAmount, getMemberLoanDtoList, member.getIsGoodMember());
	}

	public GetLoanMapResponse getLoanMap(Member member, String reqProductName) {
		// 1. 주어진 member와 상품명에 해당하는 MemberLoan을 가져옴
		MemberLoan memberLoan = memberLoanRepository.findByMemberIdAndLoanProductName(member.getId(), reqProductName)
				.orElseThrow(() -> new RuntimeException("해당 memberLoan이 없습니다"));

		// 2. 해당 MemberLoan의 모든 상환 기록을 가져옴
		List<LoanRepaymentRecord> loanRepaymentRecordList = loanRepaymentRecordRepository.findAllByMemberLoanId(memberLoan.getId());

		long totalLoanBalance = memberLoan.getInitialBalance();

		List<GetAllLoanMapDto> getAllLoanMapDtoList = new ArrayList<>();

		// 3. 현재 날짜를 계산
		LocalDate now = LocalDate.now();
		int currentYear = now.getYear();
		int currentMonth = now.getMonthValue();

		// 3.5 이번 달의 시작 잔액 입력
		getAllLoanMapDtoList.add(GetAllLoanMapDto.builder()
				.year(memberLoan.getStartYear())
				.month(memberLoan.getStartMonth())
				.loanBalance(memberLoan.getInitialBalance())
				.build());

		// 4. 상환 기록을 순회하며 대출 잔액을 계산
		for (LoanRepaymentRecord record : loanRepaymentRecordList) {
			// 상환 기록이 현재 연도와 월 이전인 경우만 잔액 계산
			if (record.getYear() < currentYear || (record.getYear() == currentYear && record.getMonth() <= currentMonth)) {
				totalLoanBalance -= record.getRepaymentBalance();

				getAllLoanMapDtoList.add(GetAllLoanMapDto.builder()
						.year(record.getYear())
						.month(record.getMonth())
						.loanBalance(totalLoanBalance)
						.build());
			}
		}

		// 6. 필요한 응답 객체를 생성하고 반환
		return GetLoanMapResponse.of(getAllLoanMapDtoList);
	}

	public GetAllLoanMapResponse getAllLoanMap(Member member) {
		// 1. 주어진 Member에 대한 모든 MemberLoan을 가져옴
		List<MemberLoan> memberLoanList = memberLoanRepository.findAllByMemberId(member.getId());
		int minYear = 10000;
		int minMonth = 40;
		int maxYear = 0;
		int maxMonth = 0;
		long totalLoanBalance = 0;
		// 2. memberLoanList에서 가장 빠른 year, month와 가장 늦은 year, month를 찾는다.
		for (MemberLoan loan : memberLoanList) {
			if (maxYear < loan.getStartYear()) {
				maxYear = loan.getStartYear();
				maxMonth = loan.getStartMonth();
			} else if (maxYear == loan.getStartYear()) {
				maxMonth = Math.max(maxMonth, loan.getStartMonth());
			}
			if (minYear > loan.getStartYear()) {
				minYear = loan.getStartYear();
				minMonth = loan.getStartMonth();
			} else if (minYear == loan.getStartYear()) {
				minMonth = Math.min(loan.getStartMonth(), minMonth);
			}
		}
		int startYear = minYear;
		int startMonth = minMonth;

		// 목표 연도와 월을 설정 (2024년 8월)
		final int targetYear = 2024;
		final int targetMonth = 8;

		List<LoanRepaymentRecord> loanRepaymentRecordList = new ArrayList<>();
		for (MemberLoan loan : memberLoanList) {
			loanRepaymentRecordList.addAll(loanRepaymentRecordRepository.findAllByMemberLoanId(loan.getId()));
		}
		List<GetAllLoanMapDto> getAllLoanMapDtoList = new ArrayList<>();
		// 3. 첫 대출 시점부터 2024년 8월까지 매월 기록을 추가
		while (startYear < targetYear || (startYear == targetYear && startMonth <= targetMonth)) {
			// 해당 월에 상환 기록이 있는지 확인
			final int currentYear = startYear;
			final int currentMonth = startMonth;
			LoanRepaymentRecord recordForMonth = loanRepaymentRecordList.stream()
				.filter(record -> record.getYear() == currentYear && record.getMonth() == currentMonth)
				.findFirst()
				.orElse(null);
			// 대출 시작 시점에 맞춰 InitialBalance를 추가
			for (MemberLoan loan : memberLoanList) {
				if (loan.getStartYear() == startYear && loan.getStartMonth() == startMonth) {
					totalLoanBalance += loan.getInitialBalance();
				}
			}
			// 상환 기록이 있다면, 잔액 갱신
			if (recordForMonth != null) {
				totalLoanBalance -= recordForMonth.getRepaymentBalance();
			}
			// 현재의 year, month, loanBalance 값을 리스트에 추가
			getAllLoanMapDtoList.add(GetAllLoanMapDto.builder()
				.year(startYear)
				.month(startMonth)
				.loanBalance(totalLoanBalance)
				.build());
			// 다음 달로 넘어가기 위한 계산
			if (startMonth == 12) {
				startMonth = 1;
				startYear++;
			} else {
				startMonth++;
			}
		}
		// 필요한 응답 객체를 생성하고 반환
		return GetAllLoanMapResponse.of(getAllLoanMapDtoList);
	}


	public GetSumLoanResponse getSumLoan(Member member) {
		// 주어진 Member에 대한 모든 MemberLoan 가져오기
		List<MemberLoan> memberLoanList = memberLoanRepository.findAllByMemberId(member.getId());

		// remainingBalance 합계 계산
		int sum = 0;
		for (MemberLoan memberLoan : memberLoanList) {
			if (memberLoan.getRemainingBalance() != null) {
				sum += memberLoan.getRemainingBalance();
			}
		}

		// GetSumLoanResponse 생성 및 반환
		return GetSumLoanResponse.of(sum);
	}

	public GetAllLoanMapResponse getBuddyLoanMap(Member member, String loanName) {
		// 1. 여정지도에 대한 시작점을 찾아야 한다. (시작 월, 시작 년도)
		MemberLoan memberLoan = memberLoanRepository.findByMemberIdAndLoanProductName(member.getId(), loanName)
				.orElseThrow(() -> new BusinessException(ErrorCode.ML_NOT_FOUND));

		int startYear = memberLoan.getStartYear();
		int startMonth = memberLoan.getStartMonth();

		LocalDate currentDate = LocalDate.now();

		int endYear = currentDate.getYear();
		int endMonth = currentDate.getMonthValue();

		List<GetAllLoanMapDto> getAllLoanMapDtoList = new ArrayList<>();

		List<AverageLoanRepaymentRecord> averageLoanRepaymentRecordList = averageLoanRepaymentRecordRepository.findByAgeAndLoanName(Integer.parseInt(member.getBirthday().substring(0,2)), loanName);

		// 2. 여정지도에 순서대로 하나씩 넣는다. 이 때 시작 점, 끝점을 넣는다.
		for (AverageLoanRepaymentRecord averageLoanRepaymentRecord: averageLoanRepaymentRecordList){
			getAllLoanMapDtoList.add(GetAllLoanMapDto.of(startYear, startMonth++, averageLoanRepaymentRecord.getRepaymentBalance()));

			if (startMonth == endMonth+1 && startYear == endYear){
				break;
			}

			if(startMonth > 12){
				startMonth = 1;
				startYear++;
			}
		}

		return GetAllLoanMapResponse.of(getAllLoanMapDtoList);
	}


	public GetMonthlyLoanResponse getMonthlyLoan(Member member) {
		List<MemberLoan> memberLoanList = memberLoanRepository.findAllByMemberId(member.getId());

		Long monthlyLoanAmount = 0L;

		for (MemberLoan memberLoan : memberLoanList) {
			if(memberLoan.getRemainingBalance() == 0){
				continue;
			}

			LoanProduct product = loanProductRepository.findByLoanName(memberLoan.getLoanProductName())
				.orElseThrow(()->new RuntimeException());

			monthlyLoanAmount += memberLoan.getInitialBalance() / product.getLoanPeriod();
		}

		return GetMonthlyLoanResponse.of(monthlyLoanAmount);
	}

	public GetPercentLoanResponse getPercentLoan(Member member) {
		List<MemberLoan> memberLoanList = memberLoanRepository.findAllByMemberId(member.getId());

		long totalLoanAmount = 0L;
		long remainingLoanAmount = 0L;

		for (MemberLoan loan : memberLoanList) {
			if (loan.getRemainingBalance() == 0) {
				continue;
			}
			totalLoanAmount += loan.getInitialBalance();
			remainingLoanAmount += loan.getRemainingBalance();
		}

		// remainingPercent를 구함 (상환한 비율을 퍼센트로)
		double remainingPercent = 0.0;
		if (totalLoanAmount > 0) {
			remainingPercent = ((double) remainingLoanAmount / totalLoanAmount) * 100;
		}

		// remainingPercent를 반환
		return GetPercentLoanResponse.of(remainingPercent);
	}

	public GetAllLoanMapResponse getAllBuddyLoanMap(Member member) {
		List<MemberLoan> memberLoanList = memberLoanRepository.findAllByMemberId(member.getId());

		List<GetAllLoanMapDto> getAllLoanMapDtoList = new ArrayList<>();

		for (MemberLoan memberLoan : memberLoanList) {
			List<AverageLoanRepaymentRecord> averageLoanRepaymentRecordList = averageLoanRepaymentRecordRepository.findByAgeAndLoanName(Integer.parseInt(member.getBirthday().substring(0, 2)), memberLoan.getLoanProductName());

			int memberStartLoanYear = memberLoan.getStartYear();
			int memberStartLoanMonth = memberLoan.getStartMonth();

			for (AverageLoanRepaymentRecord averageLoanRepaymentRecord : averageLoanRepaymentRecordList) {
				getAllLoanMapDtoList.add(GetAllLoanMapDto.of(memberStartLoanYear, memberStartLoanMonth++, averageLoanRepaymentRecord.getRepaymentBalance()));
				if (memberStartLoanMonth > 12) {
					memberStartLoanMonth = 1;
					memberStartLoanYear++;
				}
			}
		}

		// 중복되는 year와 month를 그룹화하고 balance를 합산
		Map<Integer, Map<Integer, Long>> groupedByYearAndMonth = new HashMap<>();

		for (GetAllLoanMapDto dto : getAllLoanMapDtoList) {
			groupedByYearAndMonth
					.computeIfAbsent(dto.getYear(), k -> new HashMap<>())
					.merge(dto.getMonth(), dto.getLoanBalance(), Long::sum);
		}

		// 그룹화된 데이터를 다시 List<GetAllLoanMapDto>로 변환
		List<GetAllLoanMapDto> mergedLoanMapDtoList = new ArrayList<>();
		for (Map.Entry<Integer, Map<Integer, Long>> yearEntry : groupedByYearAndMonth.entrySet()) {
			int year = yearEntry.getKey();
			for (Map.Entry<Integer, Long> monthEntry : yearEntry.getValue().entrySet()) {
				int month = monthEntry.getKey();
				Long balance = monthEntry.getValue();
				mergedLoanMapDtoList.add(GetAllLoanMapDto.of(year, month, balance));
			}
		}

		// 현재 연도와 월을 구함
		LocalDate currentDate = LocalDate.now();
		int currentYear = currentDate.getYear();
		int currentMonth = currentDate.getMonthValue();

		// 현재 연도와 월을 기준으로 필터링
		mergedLoanMapDtoList = mergedLoanMapDtoList.stream()
				.filter(dto -> dto.getYear() < currentYear || (dto.getYear() == currentYear && dto.getMonth() <= currentMonth))
				.collect(Collectors.toList());

		// 이후에 mergedLoanMapDtoList를 반환하거나, GetAllLoanMapResponse로 변환하여 반환
		return GetAllLoanMapResponse.of(mergedLoanMapDtoList);
	}

	@Transactional
    public GetAllCountLoanResponse getAllCountLoan(Member member) {
		List<MemberLoan> memberLoans = memberLoanRepository.findAllByMemberId(member.getId());

		LocalDate today = LocalDate.now();

		int year = today.getYear();
		int month = today.getMonthValue();

		int allLoanCnt = 0;
		int completedCnt = 0;

		for (MemberLoan loan : memberLoans) {
			if(loan.getRemainingBalance() == 0){
				continue;
			}
			allLoanCnt++;
			if (loanRepaymentRecordRepository.existsByMemberLoanIdAndYearAndMonth(loan.getId(), year, month)){
				completedCnt++;
			}
		}

		if (member.getMonthComplete() == MonthStatus.DONE){
			return GetAllCountLoanResponse.of(allLoanCnt,completedCnt, false);
		}

		member.setMonthComplete(MonthStatus.TRUE);

		memberRepository.save(member);

		return GetAllCountLoanResponse.of(allLoanCnt, completedCnt, true);
    }

	@Transactional
	public AddMemberRadishResponse hideMonthButton(Member member) {
		if (member.getMonthComplete() != MonthStatus.TRUE){
			throw new BusinessException(ErrorCode.MC_WRONG_REQUEST);
		}
		member.setMonthComplete(MonthStatus.DONE);

		memberRepository.save(member);

		return memberService.addMemberRadish(member);
	}

	public GetAllYearLoanMapResponse getYearlyLoan(Member member) {
		GetAllLoanMapResponse getAllLoanMapResponse = getAllLoanMap(member);

		List<GetAllLoanMapDto> getAllLoanMapDtoList = getAllLoanMapResponse.getGetAllLoanMapDtoList();

		List<GetAllYearLoanMapDto> getAllLoanMapDtoListResult = new ArrayList<>();

		LocalDate currentDate = LocalDate.now();

		int currentYear = currentDate.getYear();
		int currentMonth = currentDate.getMonthValue();

		for (GetAllLoanMapDto getAllLoanMapDto: getAllLoanMapDtoList){
			if (currentYear == getAllLoanMapDto.getYear() && currentMonth == getAllLoanMapDto.getMonth()){
				getAllLoanMapDtoListResult.add(GetAllYearLoanMapDto.of(getAllLoanMapDto.getYear(), getAllLoanMapDto.getLoanBalance()));
				break;
			}

			if (getAllLoanMapDto.getMonth() == 12){
				getAllLoanMapDtoListResult.add(GetAllYearLoanMapDto.of(getAllLoanMapDto.getYear(), getAllLoanMapDto.getLoanBalance()));
			}
		}

		return GetAllYearLoanMapResponse.of(getAllLoanMapDtoListResult);
	}

	@Transactional
	public String showMonthButton(Member member) {
		member.setMonthComplete(MonthStatus.TRUE);

		memberRepository.save(member);

		return "맴버 complete 살리기 큭큭";
	}

	// 특정 대출의 사용자 상환 기록을 연도별로 보여주는 메서드
	public GetAllYearLoanMapResponse getYearLoanMap(Member member, String loanProductName) {
		GetLoanMapResponse getAllLoanMapResponse = getLoanMap(member, loanProductName);

		List<GetAllLoanMapDto> getAllLoanMapDtoList = getAllLoanMapResponse.getGetAllLoanMapDtoList();

		List<GetAllYearLoanMapDto> getAllLoanMapDtoListResult = new ArrayList<>();

		LocalDate currentDate = LocalDate.now();

		int currentYear = currentDate.getYear();
		int currentMonth = currentDate.getMonthValue();

		for (GetAllLoanMapDto getAllLoanMapDto: getAllLoanMapDtoList){
			if (currentYear == getAllLoanMapDto.getYear() && currentMonth == getAllLoanMapDto.getMonth()){
				getAllLoanMapDtoListResult.add(GetAllYearLoanMapDto.of(getAllLoanMapDto.getYear(), getAllLoanMapDto.getLoanBalance()));
				break;
			}

			if (getAllLoanMapDto.getMonth() == 12){
				getAllLoanMapDtoListResult.add(GetAllYearLoanMapDto.of(getAllLoanMapDto.getYear(), getAllLoanMapDto.getLoanBalance()));
			}
		}

		return GetAllYearLoanMapResponse.of(getAllLoanMapDtoListResult);
	}

	// 특정 상환의 또래별 연도별 상환 기록을 보여주는 메서드
	public GetAllYearLoanMapResponse getYearBuddyLoanMap(Member member, String loanProductName) {
		GetAllLoanMapResponse getAllLoanMapResponse = getBuddyLoanMap(member, loanProductName);

		List<GetAllLoanMapDto> getAllLoanMapDtoList = getAllLoanMapResponse.getGetAllLoanMapDtoList();

		List<GetAllYearLoanMapDto> getAllLoanMapDtoListResult = new ArrayList<>();

		LocalDate currentDate = LocalDate.now();

		int currentYear = currentDate.getYear();
		int currentMonth = currentDate.getMonthValue();

		for (GetAllLoanMapDto getAllLoanMapDto: getAllLoanMapDtoList){
			if (currentYear == getAllLoanMapDto.getYear() && currentMonth == getAllLoanMapDto.getMonth()){
				getAllLoanMapDtoListResult.add(GetAllYearLoanMapDto.of(getAllLoanMapDto.getYear(), getAllLoanMapDto.getLoanBalance()));
				break;
			}

			if (getAllLoanMapDto.getMonth() == 12){
				getAllLoanMapDtoListResult.add(GetAllYearLoanMapDto.of(getAllLoanMapDto.getYear(), getAllLoanMapDto.getLoanBalance()));
			}
		}

		return GetAllYearLoanMapResponse.of(getAllLoanMapDtoListResult);
	}

	// 전체 여정 지도에서 또래별 연도로 보여주는 메서드
	public GetAllYearLoanMapResponse getYearAllBuddyLoanMap(Member member) {
		GetAllLoanMapResponse getAllLoanMapResponse = getAllBuddyLoanMap(member);

		List<GetAllLoanMapDto> getAllLoanMapDtoList = getAllLoanMapResponse.getGetAllLoanMapDtoList();

		List<GetAllYearLoanMapDto> getAllLoanMapDtoListResult = new ArrayList<>();

		LocalDate currentDate = LocalDate.now();

		int currentYear = currentDate.getYear();
		int currentMonth = currentDate.getMonthValue();

		for (GetAllLoanMapDto getAllLoanMapDto: getAllLoanMapDtoList){
			if (currentYear == getAllLoanMapDto.getYear() && currentMonth == getAllLoanMapDto.getMonth()){
				getAllLoanMapDtoListResult.add(GetAllYearLoanMapDto.of(getAllLoanMapDto.getYear(), getAllLoanMapDto.getLoanBalance()));
				break;
			}

			if (getAllLoanMapDto.getMonth() == 12){
				getAllLoanMapDtoListResult.add(GetAllYearLoanMapDto.of(getAllLoanMapDto.getYear(), getAllLoanMapDto.getLoanBalance()));
			}
		}

		return GetAllYearLoanMapResponse.of(getAllLoanMapDtoListResult);
	}

	public GetDetailLoanResponse getDetailLoan(Member member, String loanName) {
		MemberLoan memberLoan = memberLoanRepository.findByMemberIdAndLoanProductName(member.getId(), loanName)
				.orElseThrow(() -> new BusinessException(ErrorCode.ML_NOT_FOUND));

		LoanProduct loanProduct = loanProductRepository.findByLoanName(loanName)
				.orElseThrow(() -> new BusinessException(ErrorCode.LP_NOT_FOUND));

		Long remainingBalance = memberLoan.getRemainingBalance();
		Long monthBalance = memberLoan.getInitialBalance() / loanProduct.getLoanPeriod();

		return GetDetailLoanResponse.of(remainingBalance, monthBalance);
	}

	@Transactional
	public void setGoodMember(Member member) {
		member.setIsGoodMember(true);
		memberRepository.save(member);
	}
}
