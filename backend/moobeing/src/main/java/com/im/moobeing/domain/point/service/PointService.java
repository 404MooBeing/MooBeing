package com.im.moobeing.domain.point.service;

import com.im.moobeing.domain.account.entity.Account;
import com.im.moobeing.domain.account.repository.AccountRepository;
import com.im.moobeing.domain.deal.entity.Deal;
import com.im.moobeing.domain.deal.repository.DealRepository;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.point.dto.request.PointTransactionHistoryRequest;
import com.im.moobeing.domain.point.dto.response.PointTransactionHistoryResponse;
import com.im.moobeing.domain.point.entity.PointTransaction;
import com.im.moobeing.domain.point.repository.PointTransactionRepository;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PointService {

    private final DealRepository dealRepository;
    private final AccountRepository accountRepository;
    private final PointTransactionRepository pointTransactionRepository;

    public Long getCurrentBalance(Member member) {
        return pointTransactionRepository.findTopByMemberOrderByCreatedAtDesc(member)
                .map(PointTransaction::getRemainBalance)
                .orElse(0L);
    }

    @Transactional
    public void withdrawPoints(Member member, Long accountId, Long amount) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new BadRequestException(ErrorCode.AC_INVALID_ACCOUNT_NUM));

        if (!account.getMember().getId().equals(member.getId())) {
            throw new BadRequestException(ErrorCode.AC_INVALID_ACCOUNT_NUM);
        }

        account.updateBalance(amount);
        accountRepository.save(account);

        Deal deal = Deal.builder()
                .member(member)
                .dealCategory(null)
                .title("포인트 입금")
                .price(amount)
                .remainBalance(account.getAccountBalance() + amount)
                .account(account)
                .build();
        dealRepository.save(deal);

        PointTransaction transaction = new PointTransaction(member, -amount, this.getCurrentBalance(member) - amount, LocalDateTime.now());
        pointTransactionRepository.save(transaction);
    }

    public void depositPoints(Member receiver, Long amount) {
        Long currentBalance = pointTransactionRepository.findTopByMemberOrderByCreatedAtDesc(receiver)
                .map(PointTransaction::getRemainBalance)
                .orElse(0L);

        Long newBalance = currentBalance + amount;

        pointTransactionRepository.save(new PointTransaction(receiver, amount, newBalance, LocalDateTime.now()));
    }

    public List<PointTransactionHistoryResponse> getPointTransactionHistory(PointTransactionHistoryRequest request, Member member) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusMonths(request.months());

        Pageable pageable = PageRequest.of(request.page() - 1, 10);

        List<PointTransaction> transactions = pointTransactionRepository.findAllByMemberAndDateRange(
                member.getId(), startDate, endDate, request.transactionType(), pageable);

        return transactions.stream()
                .map(transaction -> new PointTransactionHistoryResponse(
                        transaction.getCreatedAt().toLocalDate().toString(),
                        transaction.getCreatedAt().toLocalTime().toString(),
                        transaction.getAmount(),
                        transaction.getRemainBalance()
                ))
                .collect(Collectors.toList());
    }
}
