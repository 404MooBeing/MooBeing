package com.im.moobeing.domain.radish.repository;

import com.im.moobeing.domain.radish.entity.RadishCapsule;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RadishCapsuleRepository extends JpaRepository<RadishCapsule, Long> {
    @Query("SELECT r FROM radish_capsule r WHERE r.member.id = :memberId AND r.createAt <= :endDate")
    List<RadishCapsule> findByMemberAndBeforeDate(
            @Param("memberId") Long memberId,
            @Param("endDate") LocalDate endDate,
            Pageable pageable);
    List<RadishCapsule> findAllByMemberId(Long memberId, Pageable pageable);
}
