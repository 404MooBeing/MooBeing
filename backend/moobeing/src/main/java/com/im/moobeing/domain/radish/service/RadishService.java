package com.im.moobeing.domain.radish.service;

import com.im.moobeing.domain.deal.entity.Deal;
import com.im.moobeing.domain.deal.repository.DealRepository;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.member.entity.MemberRadish;
import com.im.moobeing.domain.member.repository.MemberRadishRepository;
import com.im.moobeing.domain.point.service.PointService;
import com.im.moobeing.domain.radish.dto.request.CreateRadishCapsuleRequest;
import com.im.moobeing.domain.radish.dto.request.RadishCapsuleAreaRequest;
import com.im.moobeing.domain.radish.dto.response.*;
import com.im.moobeing.domain.radish.entity.RadishCapsule;
import com.im.moobeing.domain.radish.repository.RadishCapsuleRepository;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RadishService {

    private final S3Service s3Service;
    private final RadishCapsuleRepository radishCapsuleRepository;
    private final DealRepository dealRepository;
    private final MemberRadishRepository memberRadishRepository;
    private final PointService pointService;

    public List<TestCapsuleResponse> getAllCapsules() {
        return radishCapsuleRepository.findAll().stream().map(TestCapsuleResponse::of).toList();
    }

    public TestCapsuleResponse reviveCapsule(Long capsuleId) {
        RadishCapsule radishCapsule = radishCapsuleRepository.findById(capsuleId)
                .orElseThrow(() -> new BadRequestException(ErrorCode.RD_NO_RADISH));
        radishCapsule.revive();
        radishCapsuleRepository.save(radishCapsule);
        return TestCapsuleResponse.of(radishCapsule);
    }

    public CreateRadishCapsuleResponse createRadishCapsule(Member member, CreateRadishCapsuleRequest requestDto) {

        throwIfNearbyCapsule(requestDto.getLat(), requestDto.getLng(), radishCapsuleRepository.findByMemberAndNotHarvested(member.getId()), 20);

        MemberRadish memberRadish = memberRadishRepository.findByMemberIdAndRadishId(member.getId(), requestDto.getRadishId())
                .orElseThrow(() -> new BadRequestException(ErrorCode.RD_NO_RADISH));

        memberRadish.minusRadishNumber();
        if (memberRadish.getRadishNumber() == 0) {
            memberRadishRepository.delete(memberRadish);
        } else {
            memberRadishRepository.save(memberRadish);
        }

        String imageUrl = s3Service.uploadImage(requestDto.getImgFile());
        Deal deal = dealRepository.findById(requestDto.getDealId())
                .orElseThrow(() -> new BadRequestException(ErrorCode.BAD_REQUEST));

        RadishCapsule radishCapsule = RadishCapsule.builder()
                .deal(deal)
                .imgUrl(imageUrl)
                .description(requestDto.getDescription())
                .type(requestDto.getType())
                .lat(requestDto.getLat())
                .lng(requestDto.getLng())
                .addressName(requestDto.getAddressName())
                .placeName(requestDto.getPlaceName())
                .endAt(LocalDateTime.now().plusDays(requestDto.getType().getHarvestDays()))
                .character(memberRadish.getRadish())
                .member(member)
                .build();

        radishCapsuleRepository.save(radishCapsule);

        if (radishCapsule.getCharacter().getCoin() == 0) { // 기본 무
            return new CreateRadishCapsuleResponse(radishCapsule.getEndAt(), radishCapsule.getLat(), radishCapsule.getLng(), radishCapsule.getImgUrl(), 0L);
        }

        pointService.depositPoints(member, radishCapsule.getCharacter().getCoin());
        return new CreateRadishCapsuleResponse(radishCapsule.getEndAt(), radishCapsule.getLat(), radishCapsule.getLng(), radishCapsule.getImgUrl(), radishCapsule.getCharacter().getCoin());
    }

    public void throwIfNearbyCapsule(double userLat, double userLon, List<RadishCapsule> capsules, double maxDistance) {
        boolean nearbyCapsuleExists = capsules.stream()
                .filter(capsule -> !capsule.isHarvested())
                .anyMatch(capsule -> calculateDistance(userLat, userLon, capsule.getLat(), capsule.getLng()) <= maxDistance);

        if (nearbyCapsuleExists) {
            throw new BadRequestException(ErrorCode.RD_TOO_CLOSE);
        }
    }

    public static double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // 지구 반지름 (킬로미터 단위)
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000;
        return distance;
    }

    public List<CharactersResponse> characters(Member member, boolean isIncludeBaby) {
        return memberRadishRepository.findByMemberId(member.getId())
                .stream()
                .filter(memberRadish -> !Objects.isNull(memberRadish.getRadishNumber()) && memberRadish.getRadishNumber() > 0)
                .map(mr -> CharactersResponse.of(mr.getRadish(), mr.getRadishNumber()))
                .filter(charactersResponse -> isIncludeBaby || charactersResponse.radishId() != 3L)
                .sorted((o1, o2) -> o1.radishId() < o2.radishId() ? -1 : 1)
                .toList();
    }

    public List<RadishCapsuleResponse> getAllRadishCapsules(Member member, Integer page) {
        int pageSize = 5;
        Pageable pageable = PageRequest.of(page - 1, pageSize);

        List<RadishCapsule> capsules = radishCapsuleRepository.findAllByIsHarvestedAndMemberIdOrderByCreateAtDesc(true, member.getId(), pageable);

        return capsules.stream()
                .map(capsule -> RadishCapsuleResponse.of(capsule, 0L))
                .collect(Collectors.toList());
    }

    public List<RadishCapsuleResponse> getRadishCapsuleByMonth(Member member, Integer year, Integer month, Integer page) {
        int pageSize = 5;
        Pageable pageable = PageRequest.of(page - 1, pageSize);

        LocalDateTime startDate = YearMonth.of(year, month).atDay(1).atStartOfDay();
        LocalDateTime endDate = YearMonth.of(year, month).atEndOfMonth().atTime(23, 59, 59);

        List<RadishCapsule> capsules = radishCapsuleRepository.findHarvestedRadishByMemberAndDateRange(member.getId(), startDate, endDate, pageable);

        return capsules.stream()
                .map(capsule -> RadishCapsuleResponse.of(capsule, 0L))
                .collect(Collectors.toList());
    }

    public RadishCapsuleHarvestResponse harvestRadishCapsule(Long capsuleId, Member member) {
        RadishCapsule capsule = radishCapsuleRepository.findById(capsuleId)
                .orElseThrow(() -> new BadRequestException(ErrorCode.BAD_REQUEST));

        if (!capsule.getMember().getId().equals(member.getId()) ||
                capsule.getEndAt().isAfter(LocalDateTime.now()) ||
                capsule.isHarvested()
        ) {
            throw new BadRequestException(ErrorCode.BAD_REQUEST);
        }

        // 수확 처리
        capsule.harvest();
        radishCapsuleRepository.save(capsule);

        if (capsule.getCharacter().getId() == 1) { // 기본 무
            RadishCapsuleHarvestResponse.of(capsule, 0L);
        }

        pointService.depositPoints(member, 500L);
        return RadishCapsuleHarvestResponse.of(capsule, 500L);
    }

    public List<RadishCapsuleAreaResponse> findUnharvestedCapsulesInArea(Member member, RadishCapsuleAreaRequest request) {
        List<RadishCapsule> capsules = radishCapsuleRepository.findUnharvestedCapsulesInArea(
                member.getId(), request.latBottomLeft(), request.latTopRight(), request.lngBottomLeft(), request.lngTopRight());

        return capsules.stream()
                .map(RadishCapsuleAreaResponse::of)
                .collect(Collectors.toList());
    }

    public CapsuleSummaryResponse getRadishSummary(Member member) {
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE);
        List<RadishCapsule> capsules = radishCapsuleRepository
                .findAllByIsHarvestedAndMemberIdOrderByCreateAtDesc(false, member.getId(), pageable);

        List<RadishCapsule> filteredCapsules = capsules.stream()
                .filter(capsule -> capsule.getEndAt().isAfter(LocalDateTime.now()))
                .toList();

        int count = filteredCapsules.size();

        LocalDateTime time = filteredCapsules.stream()
                .map(RadishCapsule::getEndAt)
                .sorted()
                .findFirst()
                .orElseThrow(() -> new BadRequestException(ErrorCode.INTERNAL_SERVER_ERROR));

        return new CapsuleSummaryResponse(time, count);
    }
}
