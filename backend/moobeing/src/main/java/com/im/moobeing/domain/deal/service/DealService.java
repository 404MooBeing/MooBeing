package com.im.moobeing.domain.deal.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import com.im.moobeing.domain.account.entity.AccountProduct;
import com.im.moobeing.domain.account.repository.AccountProductRepository;
import com.im.moobeing.domain.deal.dto.request.DealCreateRequest;
import com.im.moobeing.domain.deal.dto.request.TransactionHistoryRequest;
import com.im.moobeing.domain.deal.dto.response.*;
import com.im.moobeing.global.error.exception.BusinessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.im.moobeing.domain.deal.dto.GetCategoryListDto;
import com.im.moobeing.domain.deal.dto.GetDrawPiChartDto;
import com.im.moobeing.domain.deal.entity.Deal;
import com.im.moobeing.domain.deal.entity.DealCategory;
import com.im.moobeing.domain.deal.repository.DealRepository;
import com.im.moobeing.domain.loan.entity.LoanRepaymentRecord;
import com.im.moobeing.domain.loan.entity.MemberLoan;
import com.im.moobeing.domain.loan.repository.LoanProductRepository;
import com.im.moobeing.domain.loan.repository.LoanRepaymentRecordRepository;
import com.im.moobeing.domain.loan.repository.MemberLoanRepository;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BadRequestException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class DealService {

    private final DealRepository dealRepository;
    private final MemberLoanRepository memberLoanRepository;
    private final LoanRepaymentRecordRepository loanRepaymentRecordRepository;
    private final AccountProductRepository accountProductRepository;

    public List<DealCategoryResponse> getDealCategory(Member member, Integer year, Integer month) {
        validateDate(year, month);
        List<Deal> deals = dealRepository.findAllByMemberAndYearAndMonth(member, year, month);

        Map<DealCategory, Long> totalDealsByCategory = deals.stream()
                .collect(Collectors.groupingBy(
                        Deal::getDealCategory,
                        Collectors.summingLong(Deal::getPrice)
                ));

        return totalDealsByCategory.entrySet().stream()
                .map(entry -> DealCategoryResponse.builder()
                        .categoryName(entry.getKey().getDescription()) // Use getDescription() for a readable name
                        .totalPrice(entry.getValue())
                        .build())
                .collect(Collectors.toList());
    }

    public List<DealDateResponse> getDealAllByDate(Member member, Integer year, Integer month) {
        validateDate(year, month);

        List<Deal> deals = dealRepository.findAllByMemberAndYearAndMonth(member, year, month);

        Map<LocalDate, List<DealHistoryResponse>> groupedByDate = deals.stream()
                .filter(deal -> !Objects.isNull(deal.getCreatedDate())) // dealDate가 nullable
                .collect(Collectors.groupingBy(
                        deal -> deal.getCreatedDate().toLocalDate(),
                        Collectors.mapping(DealHistoryResponse::of, Collectors.toList())
                ));

        List<DealDateResponse> dealDateResponses = groupedByDate.entrySet().stream()
                .map(entry -> {
                    LocalDate date = entry.getKey();
                    List<DealHistoryResponse> history = entry.getValue();
                    Long totalSpend = history.stream().mapToLong(DealHistoryResponse::getPrice).sum();
                    return DealDateResponse.of(date, totalSpend, history);
                })
                .collect(Collectors.toList());

        List<MemberLoan> memberLoans = memberLoanRepository.findAllByMemberId(member.getId());

        List<LoanRepaymentRecord> loanRepaymentRecords = new ArrayList<>();

        for (MemberLoan memberLoan : memberLoans) {
            loanRepaymentRecords.addAll(loanRepaymentRecordRepository.findAllByMemberLoanId(memberLoan.getId()));
        }

        for (DealDateResponse dealDateResponse : dealDateResponses) {
            for (LoanRepaymentRecord loanRepaymentRecord : loanRepaymentRecords) {
                if (dealDateResponse.getDate().getDayOfMonth() == loanRepaymentRecord.getDay() &&
                        dealDateResponse.getDate().getMonthValue() == loanRepaymentRecord.getMonth() &&
                        dealDateResponse.getDate().getYear() == loanRepaymentRecord.getYear()){
                    MemberLoan memberLoan = memberLoanRepository.findById(loanRepaymentRecord.getMemberLoanId())
                            .orElseThrow(() -> new BusinessException(ErrorCode.ML_NOT_FOUND));
                    String title = memberLoan.getLoanProductName() + " 상환";
                    int price = Math.toIntExact(loanRepaymentRecord.getRepaymentBalance());
                    dealDateResponse.getHistory().add(DealHistoryResponse.from(title, "대출", (long) price));
                    // 대출 상환 금액을 totalSpend에 더해줌
                    dealDateResponse.setTotalSpend(dealDateResponse.getTotalSpend() + price);
                }
            }
        }

        return dealDateResponses;
    }


    private void validateDate(Integer year, Integer month) {
        if (Objects.isNull(year) || Objects.isNull(month) || month < 1 || month > 12) {
            throw new BadRequestException(ErrorCode.BAD_REQUEST);
        }
    }

    public void createDeal(Member member, DealCreateRequest request) {
        DealCategory dealCategory;
        try {
            dealCategory = DealCategory.valueOf(request.getCategory().toUpperCase()); // Ensure it's case-insensitive
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(ErrorCode.BAD_REQUEST); // Handle invalid category
        }

        Deal deal = Deal.builder()
                .member(member)
                .title(request.getTitle())
                .price(request.getPrice())
                .dealCategory(dealCategory)
                .build();
        deal.setCreatedDate(request.getLocalDate().atStartOfDay());
        dealRepository.save(deal);
    }


    public GetDrawPiChartResponse drawPiChart(Member member, Integer year, Integer month) {
        validateDate(year, month);

        List<Deal> deals = dealRepository.findAllByMemberAndYearAndMonth(member, year, month);

        Map<DealCategory, Long> totalAmountsByCategory = deals.stream()
                .collect(Collectors.groupingBy(
                        Deal::getDealCategory,
                        Collectors.summingLong(Deal::getPrice)
                ));

        List<GetDrawPiChartDto> getDrawPiChartDtoList = totalAmountsByCategory.entrySet().stream()
                .map(entry -> {
                    DealCategory category = entry.getKey();
                    Long totalAmount = entry.getValue();
                    String color = getCategoryColor(category);  // Helper function to get category color
                    return GetDrawPiChartDto.of(category.name(), category.getDescription(), totalAmount, color);
                })
                .collect(Collectors.toList());

        long totalAmount = totalAmountsByCategory.values().stream().mapToLong(Long::longValue).sum();

        List<GetCategoryListDto> getCategoryListDtoList = totalAmountsByCategory.entrySet().stream()
                .map(entry -> {
                    DealCategory category = entry.getKey();
                    Long amount = entry.getValue();
                    double percentage = (totalAmount > 0) ? ((double) amount / totalAmount) * 100 : 0;
                    return GetCategoryListDto.of(category.getDescription(), percentage, amount);
                })
                .collect(Collectors.toList());

        return GetDrawPiChartResponse.of(totalAmount, getDrawPiChartDtoList, getCategoryListDtoList);
    }

    private String getCategoryColor(DealCategory category) {
        return switch (category) {
            case FOOD -> "hsl(190, 70%, 50%)";
            case LOAN -> "hsl(250, 70%, 50%)";
            case CULTURE -> "hsl(234, 70%, 50%)";
            case ENTERTAINMENT -> "hsl(198, 70%, 50%)";
            case TRANSPORT -> "hsl(117, 70%, 50%)";
            case HEALTH -> "hsl(61, 96%, 81%)";
            default -> "hsl(0, 0%, 80%)";
        };
    }


    /**
     * Quiz 생성을 위해 회원의 1주일간 카테고리 별 거래 정보를 가져오는 메서다
     * @param member 해당 회원
     * @return 회원의 1주일간 카테고리 별 거래 정보
     */
    public List<DealCategoryResponse> getDealForQuiz(Member member) {
        // 1일전 ~ 7일전 까지의 거래 정보를 가져온다.
        // 오늘을 포함시킬 경우 거래 내용에 변경이 생길 수 있다.
        LocalDate today = LocalDate.now().minusDays(1);
        LocalDate from = LocalDate.now().minusDays(7);
        List<Deal> deals = dealRepository.findAllByMemberAndDateRange(member, from.atStartOfDay(), today.atStartOfDay());

        Map<String, Long> totalDealsByCategory = deals.stream()
                .collect(Collectors.groupingBy(
                        deal -> String.valueOf(deal.getDealCategory()),
                        Collectors.summingLong(Deal::getPrice) // 각 카테고리의 총 금액 합산
                ));

        return totalDealsByCategory.entrySet().stream()
                .map(entry -> DealCategoryResponse.builder()
                        .categoryName(entry.getKey())
                        .totalPrice(entry.getValue())
                        .build())
                .collect(Collectors.toList());
    }

    public List<TransactionHistoryResponse> getTransactionHistory(TransactionHistoryRequest request, Member member) {
        int pageSize = 10;

        LocalDateTime startDate = LocalDateTime.now().minusMonths(Objects.isNull(request.months()) ? 9999 : request.months()); // month 없이 요청하면 다 가져오기
        LocalDateTime endDate = LocalDateTime.now();
        Pageable pageable = PageRequest.of(request.page() - 1, pageSize);

        List<Deal> deals = dealRepository.findAllByAccountAndDateRange(
                request.accountId(),
                member.getId(),
                startDate,
                endDate,
                request.transactionType(),
                pageable
        );

        return deals.stream()
                .map(TransactionHistoryResponse::of)
                .collect(Collectors.toList());
    }

    public List<AccountSummaryResponse> getAccountSummary(Member member, Integer year, Integer month, Integer day) {
        List<Deal> deals = dealRepository.findAllByMemberAndYearAndMonthAndDay(member, year, month, day);

        Map<Long, Long> totalAmountByAccount = deals.stream()
                .collect(Collectors.groupingBy(
                        deal -> deal.getAccount().getAccountId(),
                        Collectors.summingLong(Deal::getPrice)
                ));

        return totalAmountByAccount.entrySet().stream()
                .map(entry -> {
                    Deal deal = deals.stream()
                            .filter(d -> d.getAccount().getAccountId().equals(entry.getKey()))
                            .findFirst()
                            .orElseThrow(() -> new BadRequestException(ErrorCode.BAD_REQUEST));

                    String bankImage = accountProductRepository.findByAccountName(deal.getAccount().getAccountName())
                            .orElseThrow(() -> new BadRequestException(ErrorCode.BAD_REQUEST))
                            .getBankImage();

                    return new AccountSummaryResponse(
                            entry.getKey(),
                            bankImage,
                            deal.getAccount().getAccountName(),
                            entry.getValue()
                    );
                })
                .collect(Collectors.toList());
    }
}
