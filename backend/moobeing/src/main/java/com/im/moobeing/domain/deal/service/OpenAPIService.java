package com.im.moobeing.domain.deal.service;


import com.im.moobeing.domain.deal.dto.response.MoobtiResponse;
import com.im.moobeing.domain.member.entity.Member;

public interface OpenAPIService {
    MoobtiResponse getMoobti(Member member);
    String getReport(Member member);
}
