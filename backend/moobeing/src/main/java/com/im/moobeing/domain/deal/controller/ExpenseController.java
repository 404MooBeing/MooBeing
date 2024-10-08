package com.im.moobeing.domain.deal.controller;

import com.im.moobeing.domain.deal.dto.response.MoobtiResponse;
import com.im.moobeing.domain.deal.service.OpenAPIService;
import java.util.List;

import com.im.moobeing.domain.account.service.AccountService;
import com.im.moobeing.domain.deal.dto.response.PaymentSummaryResponse;
import com.im.moobeing.domain.deal.dto.request.TransactionHistoryRequest;
import com.im.moobeing.domain.deal.dto.response.AccountSummaryResponse;
import com.im.moobeing.domain.deal.dto.response.TransactionHistoryResponse;
import com.im.moobeing.domain.deal.service.DealService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.im.moobeing.domain.deal.dto.request.DealCreateRequest;
import com.im.moobeing.domain.deal.dto.response.DealCategoryResponse;
import com.im.moobeing.domain.deal.dto.response.DealDateResponse;
import com.im.moobeing.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/expense")
@RequiredArgsConstructor
@Slf4j
public class ExpenseController {
	private final DealService dealService;
	private final OpenAPIService openAPIService;
	private final AccountService accountService;

	@Operation(summary = "소비 카테고리별 조회", description = "사용자의 한달간 소비를 카테고리별로 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
			content = @Content(mediaType = "application/json",
					schema = @Schema(implementation = ErrorResponse.class),
					examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/category", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<DealCategoryResponse>> getExpenseCategory(
			@AuthenticationPrincipal Member member,
			@RequestParam Integer year,
			@RequestParam Integer month
	) {
		log.error("HIHI" + member.getId());
		return ResponseEntity.ok(dealService.getDealCategory(member, year, month));
	}

	@Operation(summary = "일자별 소비 내역 조회", description = "사용자의 한달 소비를 날짜별로 보여준다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
			content = @Content(mediaType = "application/json",
					schema = @Schema(implementation = ErrorResponse.class),
					examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<DealDateResponse>> getExpenseAllByDate(
			@AuthenticationPrincipal Member member,
			@RequestParam Integer year,
			@RequestParam Integer month
	) {
		return ResponseEntity.ok(dealService.getDealAllByDate(member, year, month));
	}

	@Operation(summary = "테스트 소비 내역 추가", description = "사용자의 소비를 추가한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
			content = @Content(mediaType = "application/json",
					schema = @Schema(implementation = ErrorResponse.class),
					examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createExpense(
			@AuthenticationPrincipal Member member,
			@RequestBody DealCreateRequest dealCreateRequest
	) {
		dealService.createDeal(member, dealCreateRequest);
		return ResponseEntity.ok(null);
	}

	@Operation(summary = "카테고리 파이차트 그리기", description = "카테고리 파이차트 그리기")
	@GetMapping("/pi")
	public ResponseEntity<?> drawPiChart(@AuthenticationPrincipal Member member,
										 @RequestParam Integer year,
										 @RequestParam Integer month) {
		return ResponseEntity.status(HttpStatus.OK).body(dealService.drawPiChart(member, year, month));
	}

	@Operation(
			summary = "거래 내역 조회",
			description = "지정된 계좌 ID, 조회 기간, 거래 유형(전체, 입금, 출금)에 따라 사용자의 거래 내역을 페이지별로 조회합니다."
	)
	@PostMapping("/history")
	public ResponseEntity<List<TransactionHistoryResponse>> getTransactionHistory(
			@RequestBody TransactionHistoryRequest request,
			@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(dealService.getTransactionHistory(request, member));
	}

	@Operation(
			summary = "계좌별 날짜 합계 조회",
			description = "해당 년도와 월의 계좌별 거래 내역 합계를 반환합니다."
	)
	@GetMapping("/account-summary")
	public ResponseEntity<List<AccountSummaryResponse>> getAccountSummary(
			@AuthenticationPrincipal Member member,
			@RequestParam Integer year,
			@RequestParam Integer month,
			@RequestParam Integer day
	) {
		return ResponseEntity.ok(dealService.getAccountSummary(member, year, month, day));
	}

	@GetMapping("/summary")
	public ResponseEntity<PaymentSummaryResponse> getPaymentSummary(@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(dealService.getPaymentSummary(member));
	}

	@GetMapping("/moobti")
	public ResponseEntity<MoobtiResponse> getMoobti(@AuthenticationPrincipal Member member) {
		MoobtiResponse moobti = openAPIService.getMoobti(member);
		return ResponseEntity.ok(moobti);
	}

	@GetMapping("/report")
	public ResponseEntity<String> getReport(@AuthenticationPrincipal Member member) {
		String report = openAPIService.getReport(member);
		return ResponseEntity.ok(report);
	}
}