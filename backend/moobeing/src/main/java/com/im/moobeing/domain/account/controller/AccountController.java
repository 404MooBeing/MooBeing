package com.im.moobeing.domain.account.controller;

import com.im.moobeing.domain.account.dto.request.CreateAccountProductRequest;
import com.im.moobeing.domain.account.dto.request.DepositRequest;
import com.im.moobeing.domain.account.dto.request.SendAccountRequest;
import com.im.moobeing.domain.account.dto.request.TransferRequest;
import com.im.moobeing.domain.account.service.AccountService;
import com.im.moobeing.domain.member.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

	private final AccountService accountService;

	@Operation(summary = "맴버의 계좌 조회", description = "맴버의 계좌를 정해야 한다.")
	@GetMapping
	public ResponseEntity<?> getAccount(@AuthenticationPrincipal Member member) {
		return ResponseEntity.status(HttpStatus.OK).body(accountService.getAccount(member));
	}

	@Operation(summary = "대출금 상납", description = "대출금 상납하기")
	@PostMapping
	public ResponseEntity<?> sendAccount(@AuthenticationPrincipal Member member, @RequestBody SendAccountRequest sendAccountRequest) {
		return ResponseEntity.status(HttpStatus.OK).body(accountService.sendAccount(member, sendAccountRequest));
	}

	// 대출 상납시 얻을 수 있는 이익 계산 API
	@Operation(summary = "대출금 상납시 얻을 수 있는 이익 계산", description = "대출금 상납시 얻을 수 있는 이익 계산 API")
	@GetMapping("/benefit")
	public ResponseEntity<?> profitMargin(@AuthenticationPrincipal Member member) {
		return ResponseEntity.status(HttpStatus.OK).body(accountService.profitMargin(member));
	}
	@Operation(summary = "계좌 생성하기", description = "")
	@PutMapping
	public ResponseEntity<?> createAccount(@AuthenticationPrincipal Member member, @RequestParam Long productId) {
		return ResponseEntity.ok(accountService.makeAccount(member, productId));
	}

	@Operation(summary = "모든 자유입출금 상품 확인하기", description = "여기에 있는 상품을 토대로 계좌를 생성해야 합니다.")
	@GetMapping("/product")
	public ResponseEntity<?> getAccountProduct() {
		return ResponseEntity.ok(accountService.getAllAccountProducts());
	}

	@Operation(summary = "자유입출금 계좌 상품 만들기", description = "상품 자체를 만드는 API입니다.")
	@PostMapping("/product")
	public ResponseEntity<?> createAccountProduct(@RequestBody CreateAccountProductRequest request) {
		accountService.createAccountProduct(request);
		return ResponseEntity.ok(null);
	}

	@Operation(summary = "계좌 이체", description = "회원의 계좌에서 다른 계좌로 돈을 송금합니다.")
	@ApiResponse(responseCode = "400", description = "잘못된 요청에 대한 응답",
			content = @Content(mediaType = "application/json",
					schema = @Schema(implementation = ErrorResponse.class),
					examples = {
							@ExampleObject(name = "Invalid Bank Code", value = "{\"error\" : \"잘못된 BankCode 입니다.\"}"),
							@ExampleObject(name = "Invalid Account Number", value = "{\"error\" : \"잘못된 계좌번호입니다.\"}"),
							@ExampleObject(name = "Insufficient Balance", value = "{\"error\" : \"잔액이 부족합니다.\"}"),
							@ExampleObject(name = "Invalid To Account Number", value = "{\"error\" : \"잘못된 계좌번호로 전송을 시도했습니다.\"}")
					}
			)
	)
	@PostMapping("/transfer")
	public ResponseEntity<?> transferFunds(@AuthenticationPrincipal Member member, @RequestBody TransferRequest transferRequest) {
		accountService.transferFunds(member, transferRequest);
		return ResponseEntity.ok(null);
	}

	@Operation(summary = "계좌 입금", description = "회원의 계좌에 돈을 입금합니다.")
	@ApiResponse(responseCode = "400", description = "잘못된 요청에 대한 응답",
			content = @Content(mediaType = "application/json",
					schema = @Schema(implementation = ErrorResponse.class),
					examples = {
							@ExampleObject(name = "Invalid Account Number", value = "{\"error\" : \"잘못된 계좌번호입니다.\"}")
					}
			)
	)
	@PostMapping("/deposit")
	public ResponseEntity<?> depositFunds(@AuthenticationPrincipal Member member, @RequestBody DepositRequest depositRequest) {
		accountService.depositFunds(member, depositRequest);
		return ResponseEntity.ok(null);
	}
}
