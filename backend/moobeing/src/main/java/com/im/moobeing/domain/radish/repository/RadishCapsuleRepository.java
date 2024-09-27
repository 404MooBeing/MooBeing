package com.im.moobeing.domain.radish.repository;

import com.im.moobeing.domain.radish.entity.RadishCapsule;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface RadishCapsuleRepository extends JpaRepository<RadishCapsule, Long> {
    @Query("SELECT r FROM radish_capsule r WHERE r.isHarvested = true AND r.member.id = :memberId AND r.createAt <= :endDate")
    List<RadishCapsule> findHarvestedRadishByMemberAndBeforeDate(
            @Param("memberId") Long memberId,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable);
    List<RadishCapsule> findAllByIsHarvestedAndMemberId(boolean isHarvested, Long memberId, Pageable pageable);
}
