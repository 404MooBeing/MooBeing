package com.im.moobeing.domain.radish.service;

import com.im.moobeing.domain.deal.entity.Deal;
import com.im.moobeing.domain.deal.repository.DealRepository;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.member.entity.MemberRadish;
import com.im.moobeing.domain.member.repository.MemberRadishRepository;
import com.im.moobeing.domain.radish.dto.request.CreateRadishCapsuleRequest;
import com.im.moobeing.domain.radish.dto.response.CharactersResponse;
import com.im.moobeing.domain.radish.dto.response.CreateRadishCapsuleResponse;
import com.im.moobeing.domain.radish.entity.RadishCapsule;
import com.im.moobeing.domain.radish.repository.RadishCapsuleRepository;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class RadishService {

    private final S3Service s3Service;
    private final RadishCapsuleRepository radishCapsuleRepository;
    private final DealRepository dealRepository;
    private final MemberRadishRepository memberRadishRepository;

    public CreateRadishCapsuleResponse createRadishCapsule(Member member, CreateRadishCapsuleRequest requestDto) {
        MemberRadish memberRadish = memberRadishRepository.findByMemberIdAndRadishId(member.getId(), requestDto.getRadishId());
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
                .build();

        radishCapsuleRepository.save(radishCapsule);

        return new CreateRadishCapsuleResponse(radishCapsule.getEndAt(), radishCapsule.getLat(), radishCapsule.getLng());
    }

    public List<CharactersResponse> characters(Member member) {
        return memberRadishRepository.findByMemberId(member.getId())
                .stream()
                .filter(memberRadish -> !Objects.isNull(memberRadish.getRadishNumber()) && memberRadish.getRadishNumber() > 0)
                .map(mr -> CharactersResponse.of(mr.getRadish(), mr.getRadishNumber()))
                .toList();
    }
}
