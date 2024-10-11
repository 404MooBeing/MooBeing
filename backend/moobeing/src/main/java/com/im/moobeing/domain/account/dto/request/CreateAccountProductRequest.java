package com.im.moobeing.domain.account.dto.request;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateAccountProductRequest {
    private String bankCode;
    private String accountName;
    private String accountDescription;
}