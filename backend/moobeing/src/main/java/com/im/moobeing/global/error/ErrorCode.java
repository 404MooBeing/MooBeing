package com.im.moobeing.global.error;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	// common
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "CM000", "요청 처리 중 오류가 발생했습니다."),
	BAD_REQUEST(HttpStatus.BAD_REQUEST, "CM001", "잘못된 요청입니다."),
	INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "CM002", "잘못된 요청 데이터 입니다."),
	UNSUPPORTED_MEDIA_TYPE(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "CM003", "데이터 타입이 올바르지 않습니다"),
	NULL_POINTER_EXCEPTION(HttpStatus.BAD_REQUEST, "CM004", "ERROR: CM004"),
	SQL_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "CM005", "ERROR: CM005"),
	HIBERNATE_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "CM006", "ERROR: CM006"),

	// 인증 && 인가
	AU_SESSION_EXPIRED(HttpStatus.UNAUTHORIZED, "AU001", "유효한 세션이 아닙니다."),
	AU_INVALID_LOGIN(HttpStatus.UNAUTHORIZED, "AU002", "로그인 정보가 잘못되었습니다. 비밀번호를 확인해주세요."),
	AU_NOT_FOUND_MEMBER(HttpStatus.NOT_FOUND, "AU003", "해당하는 유저가 없습니다."),
	AU_ALREADY_HANDLE(HttpStatus.BAD_REQUEST, "AU004", "이미 해당 아이디는 존재합니다."),
	AU_INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "AU005", "비밀번호가 틀렸습니다."),

	// localDate format
	LF_FORMAT_NOT_MATCH(HttpStatus.BAD_REQUEST,"LD001","날짜 형식이 올바르지 않습니다. 형식은 yyyy-MM-dd'T'HH:mm:ss 입니다."),

	// Quiz
	QZ_NOT_FOUND_QUIZ(HttpStatus.NOT_FOUND, "QZ001", "해당 퀴즈가 존재하지 않습니다."),
	QZ_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "QZ002", "해당 퀴즈에 대한 접근 권한이 없습니다."),
	INVALID_QUIZ_TYPE(HttpStatus.BAD_REQUEST, "QZ002", "올바르지 않은 퀴즈 타입입니다."),
	INVALID_STATUS_TYPE(HttpStatus.BAD_REQUEST, "QZ003", "올바르지 않은 퀴즈 상태입니다."),
	QZ_ALREADY_SOLVE(HttpStatus.BAD_REQUEST, "QZ004", "이미 푼 퀴즈입니다."),

	// MemberLoan
	ML_NOT_FOUND(HttpStatus.NOT_FOUND, "ML001", "해당 맴버 대출은 존재하지 않습니다."),
	ML_OVER_BALANCE(HttpStatus.BAD_REQUEST, "ML002", "대출 초과 상환입니다."),

	// LoanProduct
	LP_NOT_FOUND(HttpStatus.NOT_FOUND, "LP001", "해당 대출 상품은 존재하지 않습니다."),

	//AverageLoanRepayment
	AL_NOT_FOUND(HttpStatus.NOT_FOUND, "AL001", "해당 또래 데이터는 존재하지 않습니다."),

	//Account
	AC_NOT_FOUND(HttpStatus.NOT_FOUND, "AC001","해당 계좌는 존재하지 않습니다."),
	AC_NOT_HAVE_ENOUGH(HttpStatus.BAD_REQUEST, "AC002", "해당 계좌에 남은 돈이 적습니다."),

	// MonthComplete
	MC_WRONG_REQUEST(HttpStatus.BAD_REQUEST, "MC001", "이번달은 상환 보상은 이미 받았습니다."),

	// Account
	AC_INVALID_BANK_CODE(HttpStatus.BAD_REQUEST, "AC001", "잘못된 BankCode 입니다."),
	AC_ALREADY_EXISTS_PRODUCT(HttpStatus.TOO_MANY_REQUESTS, "AC002", "이미 계좌 상품이 존재합니다."),
	AC_INVALID_PRODUCT_CODE(HttpStatus.BAD_REQUEST, "AC003", "잘못된 상품 코드입니다."),
	AC_INVALID_ACCOUNT_NUM(HttpStatus.BAD_REQUEST, "AC004", "잘못된 계좌번호입니다."),
	AC_INSUFFICIENT_BALANCE(HttpStatus.BAD_REQUEST, "AC005", "잔액이 부족합니다."),
	AC_INVALID_TO_ACCOUNT_NUM(HttpStatus.BAD_REQUEST, "AC006", "잘못된 계좌번호로 전송을 시도했습니다."),

	// Loan
	LN_CREDIT_SCORE_TOO_LOW(HttpStatus.FORBIDDEN, "LN001", "신용등급이 낮아 대출이 거절되었습니다."),
	LN_ALREADY_EXISTS_PRODUCT(HttpStatus.TOO_MANY_REQUESTS, "LN002", "이미 대출 상품이 존재합니다."),
	LN_INVALID_PRODUCT_CODE(HttpStatus.BAD_REQUEST, "LN003", "잘못된 상품 코드입니다."),

	// Radish
	RD_NO_RADISH(HttpStatus.BAD_REQUEST, "RD001", "없는 무로 캡슐을 만들 수 없습니다.");

	private final HttpStatus status;
	private final String code;
	private final String message;
}

