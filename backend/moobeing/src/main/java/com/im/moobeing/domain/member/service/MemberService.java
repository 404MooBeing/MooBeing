package com.im.moobeing.domain.member.service;

import com.im.moobeing.domain.account.service.AccountService;
import com.im.moobeing.domain.member.dto.request.*;
import com.im.moobeing.domain.member.dto.response.*;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.member.entity.MemberRadish;
import com.im.moobeing.domain.member.entity.Nickname;
import com.im.moobeing.domain.member.repository.MemberRadishRepository;
import com.im.moobeing.domain.member.repository.MemberRepository;
import com.im.moobeing.domain.member.repository.NicknameRepository;
import com.im.moobeing.domain.member.repository.NicknameWordRepository;
import com.im.moobeing.domain.radish.entity.Radish;
import com.im.moobeing.domain.radish.entity.RadishTime;
import com.im.moobeing.domain.radish.repository.RadishRepository;
import com.im.moobeing.domain.radish.repository.RadishTimeRepository;
import com.im.moobeing.global.client.ShinhanClient;
import com.im.moobeing.global.config.ApiKeyConfig;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.AuthenticationException;
import com.im.moobeing.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RadishRepository radishRepository;
    private final MemberRadishRepository memberRadishRepository;
    private final RadishTimeRepository radishTimeRepository;
    private final NicknameRepository nicknameRepository;
    private final AccountService accountService;

    @Transactional
    public MemberCreateResponse createMember(MemberCreateRequest memberCreateRequest) {
        memberRepository.findByEmail(memberCreateRequest.getEmail()).ifPresent(member -> {
            throw new AuthenticationException(ErrorCode.AU_ALREADY_HANDLE);
        });

        String birthDay = memberCreateRequest.getHumanNumber().substring(0, 6);
        String gender;
        int checkGender = Integer.parseInt(memberCreateRequest.getHumanNumber().substring(6,7));

        if (checkGender == 1 || checkGender == 3) {
            gender = "남자";
        } else if (checkGender == 2 || checkGender == 4){
            gender = "여자";
        } else{
            throw new RuntimeException("둘다 아니다. 넌 누구냐");
        }

        Member member = Member.builder()
                .email(memberCreateRequest.getEmail())
                .password(memberCreateRequest.getPassword())
                .name(memberCreateRequest.getName())
                .birthday(birthDay)
                .gender(gender)
                .nickname(getNewNickname())
                .selectedRadishId(1L)
                .build();

        Radish radish = radishRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("Radish not found with id: " + 1L));

        MemberRadish newMemberRadish = MemberRadish.builder()
                .member(member)
                .radish(radish)
                .radishNumber(1L)
                .build();

        member.addMemberRadish(newMemberRadish);

        member = memberRepository.save(member); // 데이터베이스에 멤버 저장

        accountService.makeAccount(member);

        return MemberCreateResponse.of(member); // 저장된 멤버 정보를 바탕으로 응답 생성
    }

    private String getNewNickname() {
        String name = NicknameWordRepository.getRandomNickname();
        Optional<Nickname> optionalNickname = nicknameRepository.findByNickname(name);
        long sequence = optionalNickname.map(value -> value.getNextSequence() + 1).orElse(1L);
        Nickname nickname = new Nickname(name, sequence);
        nicknameRepository.save(nickname);
        return nickname.getNickname();
    }

    public Member loginMember(MemberLoginRequest memberLoginRequest) {
        // 사용자 정보 조회
        Member member = memberRepository.findByEmail(memberLoginRequest.getEmail())
                .orElseThrow(() -> new AuthenticationException(ErrorCode.AU_NOT_FOUND_MEMBER));

        // 비밀번호 검증
        if (!member.getPassword().equals(memberLoginRequest.getPassword())) {
            throw new AuthenticationException(ErrorCode.AU_INVALID_LOGIN);
        }

        // 로그인 성공 응답 반환
        return member;
    }

    public MemberLoginResponse selectedRadishMember(Member member) {
        Radish radish = radishRepository.findById(member.getSelectedRadishId())
                .orElseThrow(() -> new IllegalArgumentException("Radish not found with id: " + member.getSelectedRadishId()));

        return MemberLoginResponse.of(member, radish.getRadishName(), radish.getRadishRank(), radish.getRadishImageUrl());
    }

    public MemberGetResponse getMember(Member member) {
        Radish radish = radishRepository.findById(member.getSelectedRadishId())
                .orElseThrow(() -> new IllegalArgumentException("Radish not found with id: " + member.getSelectedRadishId()));

        return MemberGetResponse.of(member, radish.getRadishImageUrl());
    }

    @Transactional
    public void changeMember(Member member, MemberChangeRequest memberChangeRequest) {
        member.changeMember(memberChangeRequest);
        memberRepository.save(member);
    }

    public MemberRadishResponse getMemberRadish(Member member) {
        return MemberRadishResponse.of(member);
    }

    @Transactional
    public AddMemberRadishResponse addMemberRadish(Member member) {
        // 랜덤 Radish ID 선택
        long count = radishRepository.count();
        Long randomRadishId;

        do {
            randomRadishId = 1 + new Random().nextLong(count);
        } while (randomRadishId == 3L);

        // 해당 radishId에 대한 Radish 엔티티를 찾습니다.
        Long finalRandomRadishId = randomRadishId;
        Radish radish = radishRepository.findById(randomRadishId)
            .orElseThrow(() -> new IllegalArgumentException("Radish not found with id: " + finalRandomRadishId));

        // MemberRadish 생성 및 추가
        Long finalRandomRadishId1 = randomRadishId;
        MemberRadish existingMemberRadish = member.getMemberRadishes().stream()
            .filter(memberRadish -> memberRadish.getRadish().getId().equals(finalRandomRadishId1))
            .findFirst()
            .orElse(null);

        if (existingMemberRadish != null) {
            MemberRadish memberRadishToUpdate = memberRadishRepository.findById(existingMemberRadish.getId())
                .orElseThrow(() -> new IllegalArgumentException("Radish not found with id: " + existingMemberRadish.getId()));
            memberRadishToUpdate.addRadishNumber();
        } else {
            MemberRadish newMemberRadish = MemberRadish.builder()
                .member(member)
                .radish(radish)
                .radishNumber(1L)
                .build();
            member.addMemberRadish(newMemberRadish);
            memberRadishRepository.save(newMemberRadish); // 이 줄만 저장하도록 변경
        }

        radishTimeRepository.save(RadishTime.builder()
                .memberId(member.getId())
                .build());

        return AddMemberRadishResponse.of(member, radish.getRadishName(), radish.getRadishRank(),
            radish.getRadishImageUrl(), radish.getRadishMessage());
    }


    @Transactional
    public void changeMemberPw(Member member, MemberPwChangeRequest memberPwChangeRequest) {
        if (!member.getPassword().equals(memberPwChangeRequest.getOldPassword())) {
            throw new AuthenticationException(ErrorCode.AU_INVALID_PASSWORD);
        }

        member.changeMemberPw(memberPwChangeRequest);
        memberRepository.save(member);
    }

    public MemberCheckEmailResponse checkEmailMember(MemberCheckEmailRequest memberCheckEmailRequest) {
        if (memberRepository.findByEmail(memberCheckEmailRequest.getEmail()).isPresent()){
            return MemberCheckEmailResponse.of(false);
        }
        return MemberCheckEmailResponse.of(true);
    }

    @Transactional
    public MemberRadishSelectResponse selectMemberRadish(Member member, MemberRadishSelectRequest memberRadishSelectRequest) {
        Radish radish = radishRepository.findByRadishName(memberRadishSelectRequest.getRadishName())
                .orElseThrow(() -> new IllegalArgumentException("Radish not found with name: " + memberRadishSelectRequest.getRadishName()));
        member.setMemberRadishId(radish.getId());
        Member savedMember = memberRepository.save(member);
        Radish savedRadish = radishRepository.findById(savedMember.getSelectedRadishId())
                .orElseThrow(() -> new IllegalArgumentException("Radish not found with name: " + memberRadishSelectRequest.getRadishName()));

        return MemberRadishSelectResponse.of(savedRadish.getRadishName(), savedRadish.getRadishRank(), savedRadish.getRadishImageUrl());
    }

    @Transactional
    public AddMemberRadishResponse addMemberBaby(Member member) {
        // 랜덤 Radish ID 선택
        Long babyMooRadishId = 3L;

        // 해당 radishId에 대한 Radish 엔티티를 찾습니다.
        Radish radish = radishRepository.findById(babyMooRadishId)
            .orElseThrow(() -> new IllegalArgumentException("Radish not found with id: " + babyMooRadishId));

        // MemberRadish 생성 및 추가
        MemberRadish existingMemberRadish = member.getMemberRadishes().stream()
            .filter(memberRadish -> memberRadish.getRadish().getId().equals(babyMooRadishId))
            .findFirst()
            .orElse(null);

        if (existingMemberRadish != null) {
            MemberRadish memberRadishToUpdate = memberRadishRepository.findById(existingMemberRadish.getId())
                .orElseThrow(() -> new IllegalArgumentException("Radish not found with id: " + existingMemberRadish.getId()));
            memberRadishToUpdate.addRadishNumber();
        } else {
            MemberRadish newMemberRadish = MemberRadish.builder()
                .member(member)
                .radish(radish)
                .radishNumber(1L)
                .build();
            member.addMemberRadish(newMemberRadish);
            memberRadishRepository.save(newMemberRadish); // 이 줄만 저장하도록 변경
        }

        return AddMemberRadishResponse.of(member, radish.getRadishName(), radish.getRadishRank(),
            radish.getRadishImageUrl(), radish.getRadishMessage());
    }

    /**
     * Quiz 에서 모든 회원에 대해서 퀴즈를 만들기 위해
     * 모든 회원을 가져오는 메서드
     * @return 모든 회원 리스트
     */
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @Transactional
    public AddMemberRadishResponse mergeMemberBaby(Member member) {
        // 랜덤 Radish ID 선택
        Long babyMooRadishId = 3L;

        // 해당 radishId에 대한 Radish 엔티티를 찾습니다.
        Radish radish = radishRepository.findById(babyMooRadishId)
                .orElseThrow(() -> new IllegalArgumentException("Radish not found with id: " + babyMooRadishId));

        // member와 radish를 기준으로 memberRadish 엔티티를 찾습니다.
        MemberRadish memberRadish = memberRadishRepository.findByMemberIdAndRadishId(member.getId(), radish.getId())
                .orElseThrow(() -> new BadRequestException(ErrorCode.RD_NO_RADISH));

        if (memberRadish.getRadishNumber() > 5) {
            // radishNumber가 5 초과일 경우 5를 감소시킵니다.
            memberRadish.minus5();
        } else {
            // radishNumber가 5 이하일 경우 memberRadish 엔티티를 삭제합니다.
            memberRadishRepository.delete(memberRadish);
        }

        radishTimeRepository.save(RadishTime.builder()
                .memberId(member.getId())
                .build());

        return addMemberRadish(member);
    }

    public StreamCntMemberResponse streamCntMember(Member member) {
        int streamCnt = 0;
        boolean stop = true;

        List<RadishTime> radishTimes = radishTimeRepository.findAllByMemberId(member.getId());

        LocalDate currentDate = LocalDate.now();

        int currentYear = currentDate.getYear();
        int currentMonth = currentDate.getMonthValue();

        int year = currentYear;
        int month = currentMonth;

        for (int i = 0; i < 6; i++){
            month--;
            if (month == 0){
                year--;
                month = 12;
            }
            for (RadishTime radishTime : radishTimes){
                int radishYear = radishTime.getCreatedDate().getYear();
                int radishMonth = radishTime.getCreatedDate().getMonthValue();

                if (year == radishYear && month == radishMonth) {
                    streamCnt++;
                    stop = false;
                }
            }
            if (stop == true){
                break;
            } else {
                stop = true;
            }
        }

        for (RadishTime radishTime : radishTimes) {
            int radishYear = radishTime.getCreatedDate().getYear();
            int radishMonth = radishTime.getCreatedDate().getMonthValue();
            if(radishYear == currentYear && radishMonth == currentMonth){
                streamCnt++;
                break;
            }
        }

        return StreamCntMemberResponse.of(streamCnt);
    }
}
