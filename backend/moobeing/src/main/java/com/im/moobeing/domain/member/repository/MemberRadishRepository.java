package com.im.moobeing.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.im.moobeing.domain.member.entity.MemberRadish;

import java.util.List;
import java.util.Optional;

public interface MemberRadishRepository extends JpaRepository<MemberRadish, Long> {
    Optional<MemberRadish> findByMemberIdAndRadishId(Long memberId, Long RadishId);
    List<MemberRadish> findByMemberId(Long memberId);
}
