package com.im.moobeing.domain.member.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberLoginRequest {
    @Schema(description = "회원 이메일", example = "test@gmail.com")
    private String email;

    @Schema(description = "회원 비밀번호", example = "test")
    private String password;
}
