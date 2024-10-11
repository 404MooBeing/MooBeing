package com.im.moobeing.domain.credit.service;

import com.im.moobeing.domain.account.entity.Account;
import com.im.moobeing.domain.account.repository.AccountRepository;
import com.im.moobeing.domain.credit.dto.response.CreditGetResponse;
import com.im.moobeing.domain.loan.entity.MemberLoan;
import com.im.moobeing.domain.loan.repository.MemberLoanRepository;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.global.client.ShinhanClient;
import com.im.moobeing.global.config.ApiKeyConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CreditService {

    private final ShinhanClient shinhanClient;
    private final ApiKeyConfig apiKeyConfig;
    private final MemberLoanRepository memberLoanRepository;
    private final AccountRepository accountRepository;

    public CreditGetResponse getCredit(Member member) {
        // GetLoanInquireMyCreditRatingRequest 객체를 생성
        // GetInquireMyCreditRatingRequest request = new GetInquireMyCreditRatingRequest(apiKeyConfig, member.getUserKey());
        // GetInquireMyCreditRatingResponse getInquireMyCreditRatingResponse = null;
        // getInquireMyCreditRatingResponse = shinhanClient.getInquireMyCreditRating(request);

        // 총 자산 값 가져오기
        // long totalAssetValue = Long.parseLong(getInquireMyCreditRatingResponse.getRec().getTotalAssetValue());
        long totalAssetValue = 0L;
        List<MemberLoan> memberLoanList = memberLoanRepository.findAllByMemberId(member.getId());
        List<Account> accountList = accountRepository.findByMemberId(member.getId());

        for (MemberLoan memberLoan : memberLoanList) {
            totalAssetValue -= memberLoan.getRemainingBalance();
        }

        for (Account account : accountList) {
            totalAssetValue += account.getAccountBalance();
        }

        long neededAmount;
        String ratingName;
        int ratingPercent;

        // 조건에 따른 result 값 계산
        if (totalAssetValue >= 100_000_000) {
            neededAmount = 0; // 1억 이상이면 0
            ratingPercent = 100;
            ratingName = "A";
        } else if (totalAssetValue >= 80_000_000) {
            neededAmount = totalAssetValue - 80_000_000; // 8천만 이상이면 1억 - 이 값
            ratingPercent = (int)(neededAmount / 20_000_000);
            ratingName = "B";
        } else if (totalAssetValue >= 50_000_000) {
            neededAmount = totalAssetValue - 50_000_000; // 5천만 이상이면 8천만 - 이 값
            ratingPercent = (int)(neededAmount / 30_000_000);
            ratingName = "C";
        } else if (totalAssetValue >= 30_000_000) {
            neededAmount = totalAssetValue - 30_000_000; // 3천만 이상이면 5천만 - 이 값
            ratingPercent = (int)(neededAmount / 20_000_000);
            ratingName = "D";
        } else {
            ratingPercent = (int)(totalAssetValue / 30_000_000);
            ratingName = "E";
        }

        // 여기에 필요한 추가 로직을 작성하세요.
        // return CreditGetResponse.of(getInquireMyCreditRatingResponse.getRec().getRatingName(), neededAmount);
        return CreditGetResponse.of(ratingName, ratingPercent);
    }
}
