package com.im.moobeing.domain.expense.controller;

import java.util.List;

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

import com.im.moobeing.domain.expense.dto.request.ExpenseCreateRequest;
import com.im.moobeing.domain.expense.dto.response.ExpenseCategoryResponse;
import com.im.moobeing.domain.expense.dto.response.ExpenseDateResponse;
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
public class ExpenseController {
	private final ExpenseService expenseService;

	@Operation(summary = "소비 카테고리별 조회", description = "사용자의 한달간 소비를 카테고리별로 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/category", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ExpenseCategoryResponse>> getExpenseCategory(
			@AuthenticationPrincipal Member member,
			@RequestParam Integer year,
			@RequestParam Integer month
	) {
		return ResponseEntity.ok(expenseService.getExpenseCategory(member, year, month));
	}

	@Operation(summary = "일자별 소비 내역 조회", description = "사용자의 한달 소비를 날짜별로 보여준다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ExpenseDateResponse>> getExpenseAllByDate(
			@AuthenticationPrincipal Member member,
			@RequestParam Integer year,
			@RequestParam Integer month
	) {
		return ResponseEntity.ok(expenseService.getExpenseAllByDate(member, year, month));
	}

	@Operation(summary = "테스트 소비 내역 추가", description = "사용자의 소비를 추가한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
			content = @Content(mediaType = "application/json",
					schema = @Schema(implementation = ErrorResponse.class),
					examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createExpense(
			@AuthenticationPrincipal Member member,
			@RequestBody ExpenseCreateRequest expenseCreateRequest
	) {
		expenseService.createExpense(member, expenseCreateRequest);
		return ResponseEntity.ok(null);
	}

	@Operation(summary = "카테고리 파이차트 그리기", description = "카테고리 파이차트 그리기")
	@GetMapping("/pi")
	public ResponseEntity<?> drawPiChart(@AuthenticationPrincipal Member member,
		@RequestParam Integer year,
		@RequestParam Integer month){
			return ResponseEntity.status(HttpStatus.OK).body(expenseService.drawPiChart(member, year, month));
	}

}
