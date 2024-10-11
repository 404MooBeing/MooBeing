package com.im.moobeing.global.error.exception;

import com.im.moobeing.global.error.ErrorCode;

public class AuthenticationException extends BusinessException {

	public AuthenticationException(ErrorCode errorCode) {
		super(errorCode);
	}
}

