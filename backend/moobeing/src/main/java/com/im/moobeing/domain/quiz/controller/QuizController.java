package com.im.moobeing.domain.quiz.controller;

import com.im.moobeing.domain.quiz.dto.request.EconomicQuizAnswerRequest;
import com.im.moobeing.domain.quiz.dto.response.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.quiz.dto.request.QuizAnswerRequest;
import com.im.moobeing.domain.quiz.service.QuizService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
@Slf4j
@RestController
@RequestMapping("/quiz")
@RequiredArgsConstructor
public class QuizController {
	private final QuizService quizService;

//	@Operation(summary = "퀴즈 전체 조회", description = "사용자의 퀴즈를 전체 조회한다.")
//	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
//		content = @Content(mediaType = "application/json",
//			schema = @Schema(implementation = ErrorResponse.class),
//			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
//	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<List<QuizResponse>> getQuizAll(@AuthenticationPrincipal Member member) {
//		return ResponseEntity.ok(quizService.getQuizAll(member));
//	}

	@Operation(summary = "퀴즈 상세 조회", description = "사용자의 퀴즈를 상세 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping( produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<QuizDetailResponse> getQuiz(@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(quizService.getQuiz(member));
	}

	@Operation(summary = "미해결 퀴즈 조회", description = "사용자의 해결되지 않은 퀴즈가 있는지 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/cold", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<QuizColdResponse> getColdQuiz(@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(quizService.getQuizCold(member));
	}

	@Operation(summary = "퀴즈 정답 확인", description = "입력한 퀴즈의 정답이 맞는지 확인하고 상태를 변경한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(path = "/{quizNum}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<QuizAnswerResponse> confirmQuizAnswer(
		@AuthenticationPrincipal Member member,
		@RequestBody QuizAnswerRequest quizAnswerRequest,
		@PathVariable long quizNum) {
		return ResponseEntity.ok(quizService.confirmQuizAnswer(member, quizNum, quizAnswerRequest));
	}

	@Operation(summary = "퀴즈 done으로 바꾸기", description = "퀴즈 done 으로 바꾸기")
	@PostMapping(path = "/{quizNum}/close", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> closeQuizAnswer(
		@AuthenticationPrincipal Member member,
		@PathVariable long quizNum) {
		return ResponseEntity.ok(quizService.closeQuizAnswer(member, quizNum));
	}

	@Operation(summary = "test 퀴즈 다시 살리기로 바꾸기", description = "test 퀴즈 다시 살리기로 바꾸기")
	@PostMapping(path = "/{quizNum}/open", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> openQuizAnswer(
		@AuthenticationPrincipal Member member,
		@PathVariable long quizNum) {
		return ResponseEntity.ok(quizService.openQuizAnswer(member, quizNum));
	}

	@Operation(summary = "경제 용어 퀴즈 상세 조회", description = "사용자의 경제 용어 퀴즈를 상세 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
			content = @Content(mediaType = "application/json",
					schema = @Schema(implementation = ErrorResponse.class),
					examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping("/economic")
	public ResponseEntity<EconomicQuizDetailResponse> getEconomicQuiz(@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(quizService.getEconomicQuiz(member));
	}

	@Operation(summary = "경제 용어 퀴즈 정답 확인", description = "입력한 경제 용어 퀴즈의 정답이 맞는지 확인하고 상태를 변경한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
			content = @Content(mediaType = "application/json",
					schema = @Schema(implementation = ErrorResponse.class),
					examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(path = "/economic/{quizNum}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<EconomicQuizAnswerResponse> confirmEconomicQuizAnswer(
			@AuthenticationPrincipal Member member,
			@RequestBody EconomicQuizAnswerRequest quizAnswerRequest,
			@PathVariable long quizNum) {
		return ResponseEntity.ok(quizService.confirmEconomicQuizAnswer(member, quizNum, quizAnswerRequest));
	}
}