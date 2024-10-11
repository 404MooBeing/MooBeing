package com.im.moobeing.domain.loan.controller;

import com.im.moobeing.domain.loan.dto.response.GetPercentLoanNameResponse;
import com.im.moobeing.domain.loan.dto.response.GetPercentLoanResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.im.moobeing.domain.loan.service.LoanService;
import com.im.moobeing.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/loan")
@RequiredArgsConstructor
public class LoanController {

	private final LoanService loanService;

	@Operation(summary = "맴버의 대출 리스트 조회", description = "맴버의 대출 리스트를 조회한다.")
	@GetMapping()
	public ResponseEntity<?> getMemberLoan(@AuthenticationPrincipal Member member, @RequestParam String sort){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getMemberLoan(member, sort));
	}

	@Operation(summary = "선택한 대출 여정지도 검색", description = "선택한 대출 여정 지도를 검색한다.")
	@GetMapping("/map")
	public ResponseEntity<?> getLoanMap(@AuthenticationPrincipal Member member,
										@RequestParam(defaultValue = "우리은행 주택담보대출") String loanProductName) {
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getLoanMap(member, loanProductName));
	}

	@Operation(summary = "총합 대출 여정지도 검색", description = "총합 대출 여정 지도를 검색한다.")
	@GetMapping("/all-map")
	public ResponseEntity<?> getAllLoanMap(@AuthenticationPrincipal Member member){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getAllLoanMap(member));
	}

	@Operation(summary = "나의 대출금 총금액 확인", description = "나의 대출금 총 금액을 확인한다")
	@GetMapping("/sum")
	public ResponseEntity<?> getSumLoan(@AuthenticationPrincipal Member member){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getSumLoan(member));
	}

	@Operation(summary = "또래 상환능력 조회", description = "또래 상환능력 조회 하기")
	@GetMapping("/buddy")
	public ResponseEntity<?> getBuddyLoanMap(@AuthenticationPrincipal Member member, @RequestParam(defaultValue = "우리은행 주택담보대출") String loanName){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getBuddyLoanMap(member, loanName));
	}

	@Operation(summary = "이번달 상환 예정 금액 구하기", description = "이번달 상환 예정 금액 구하기")
	@GetMapping("/monthly")
	public ResponseEntity<?> getMonthlyLoan(@AuthenticationPrincipal Member member){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getMonthlyLoan(member));
	}

	@Operation(summary = "몇 퍼센트 상환인지 체크", description = "몇 퍼센트 상환인지 체크하기")
	@GetMapping("/percent")
	public ResponseEntity<?> getPercentLoan(@AuthenticationPrincipal Member member){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getPercentLoan(member));
	}

	@Operation(summary = "대출별로 몇 퍼센트 상환인지 체크", description = "몇 퍼센트 상환인지 체크하기")
	@GetMapping("/percent-name")
	public ResponseEntity<?> getPercentLoanName(@AuthenticationPrincipal Member member){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getPercentLoanName(member));
	}

	@Operation(summary = "특정 대출의 상환 퍼센트 확인", description = "몇 퍼센트 상환인지 체크하기")
	@GetMapping("/percent-name-detail")
	public ResponseEntity<GetPercentLoanResponse> getPercentLoanNameResponseResponse(
			@AuthenticationPrincipal Member member,
			@RequestParam String loanName
	) {
		return ResponseEntity.ok(loanService.getPercentLoanResponse(member, loanName));
	}

	@Operation(summary = "모든 대출금 또래 상환능력 조회", description = "모든 대출금 또래 상환능력 조회 하기")
	@GetMapping("/all-buddy")
	public ResponseEntity<?> getAllBuddyLoanMap(@AuthenticationPrincipal Member member){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getAllBuddyLoanMap(member));
	}

	@Operation(summary = "몇개의 대출을 모두 갚았는 지", description = "몇개의 대출을 모두 갚았는 지 알려주는 API")
	@GetMapping("/count")
	public ResponseEntity<?> getAllCountLoan(@AuthenticationPrincipal Member member){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getAllCountLoan(member));
	}

	@Operation(summary = "이번 달 대출금 버튼 클릭 ", description = "버튼을 클릭하면 대출금 보내기")
	@PostMapping("/monthClick")
	public ResponseEntity<?> hideMonthButton(@AuthenticationPrincipal Member member) {
		return ResponseEntity.status(HttpStatus.OK).body(loanService.hideMonthButton(member));
	}

	@Operation(summary = "Test 맴버 대출 무 살리기", description = "Test 맴버 대출 무 살리기")
	@PostMapping("/testMonth")
	public ResponseEntity<?> showMonthButton(@AuthenticationPrincipal Member member) {
		return ResponseEntity.status(HttpStatus.OK).body(loanService.showMonthButton(member));
	}

	@Operation(summary = "년도 총합 대출 여정지도 검색", description = "년도 총합 대출 여정지도 검색")
	@GetMapping("/all-map-year")
	public ResponseEntity<?> getYearlyLoan(@AuthenticationPrincipal Member member){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getYearlyLoan(member));
	}

	@Operation(summary = "년도 선택한 대출 여정지도 검색", description = "선택한 대출 여정 지도를 검색한다.")
	@GetMapping("/map-year")
	public ResponseEntity<?> getYearLoanMap(@AuthenticationPrincipal Member member,
										@RequestParam(defaultValue = "우리은행 주택담보대출") String loanProductName) {
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getYearLoanMap(member, loanProductName));
	}

	@Operation(summary = "년도 또래 선택한 대출 여정지도 검색", description = "선택한 대출 여정 지도를 검색한다.")
	@GetMapping("/buddy-year")
	public ResponseEntity<?> getYearBuddyLoanMap(@AuthenticationPrincipal Member member,
											@RequestParam(defaultValue = "우리은행 주택담보대출") String loanProductName) {
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getYearBuddyLoanMap(member, loanProductName));
	}

	@Operation(summary = "모든 대출금 또래 상환능력 조회", description = "모든 대출금 또래 상환능력 조회 하기")
	@GetMapping("/all-buddy-year")
	public ResponseEntity<?> getYearAllBuddyLoanMap(@AuthenticationPrincipal Member member){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getYearAllBuddyLoanMap(member));
	}

	@Operation(summary = "상세 대출 조회 하기", description = "상세 대출 조회 하기")
	@GetMapping("/detail")
	public ResponseEntity<?> getDetailLoan(@AuthenticationPrincipal Member member,
										   @RequestParam(defaultValue = "우리은행 주택담보대출") String loanProductName){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getDetailLoan(member, loanProductName));
	}

	@Operation(summary = "대출 금리 줄이기", description = "대출 금리 줄이기")
	@PostMapping("/good")
	public ResponseEntity<?> setGoodMember(@AuthenticationPrincipal Member member){
		loanService.setGoodMember(member);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
}
