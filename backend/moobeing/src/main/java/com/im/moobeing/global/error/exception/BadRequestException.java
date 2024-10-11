package com.im.moobeing.global.error.exception;

import com.im.moobeing.global.error.ErrorCode;

public class BadRequestException extends BusinessException {

	public BadRequestException(ErrorCode errorCode) {
		super(errorCode);
	}
}
