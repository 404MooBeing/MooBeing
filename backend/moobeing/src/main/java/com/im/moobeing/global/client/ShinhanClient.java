package com.im.moobeing.global.client;

import com.im.moobeing.global.client.dto.request.GetInquireMyCreditRatingRequest;
import com.im.moobeing.global.client.dto.request.GetUserKeyRequest;
import com.im.moobeing.global.client.dto.response.GetInquireMyCreditRatingResponse;
import com.im.moobeing.global.client.dto.response.GetUserKeyResponse;
import com.im.moobeing.global.config.FeignClientConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(url = "https://finopenapi.p.ssafy.io/ssafy/api/v1", name = "ShinhanClient", configuration = FeignClientConfig.class)
public interface ShinhanClient {

    // userKey 발급 구현
    @PostMapping(value = "/member/", consumes = "application/json", produces = "application/json")
    GetUserKeyResponse getUserKey(
            @RequestBody GetUserKeyRequest requestDto
    );

    // userKey 발급 구현
    @PostMapping(value = "/edu/loan/inquireMyCreditRating", consumes = "application/json", produces = "application/json")
    GetInquireMyCreditRatingResponse getInquireMyCreditRating(
            @RequestBody GetInquireMyCreditRatingRequest getInquireMyCreditRatingRequest
    );
}