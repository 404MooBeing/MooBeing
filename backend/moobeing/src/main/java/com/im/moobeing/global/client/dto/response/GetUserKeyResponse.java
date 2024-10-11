package com.im.moobeing.global.client.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GetUserKeyResponse {

    private String userId;
    private String userName;
    private String institutionCode;
    private String userKey;
    private String created;
    private String modified;
}
