package com.im.moobeing.global.error.exception;

import lombok.Getter;

@Getter
public class ShinhanApiException extends RuntimeException {
    private String responseCode;
    private String responseMessage;

    public ShinhanApiException(String responseCode, String responseMessage) {
        super(responseMessage);
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
    }
}
