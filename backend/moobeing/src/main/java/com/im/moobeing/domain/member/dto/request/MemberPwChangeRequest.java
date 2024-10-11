package com.im.moobeing.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberPwChangeRequest {
    String oldPassword;
    String newPassword;
}
