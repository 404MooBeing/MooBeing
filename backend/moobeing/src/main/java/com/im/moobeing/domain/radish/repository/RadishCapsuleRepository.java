package com.im.moobeing.domain.radish.repository;

import com.im.moobeing.domain.radish.entity.RadishCapsule;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface RadishCapsuleRepository extends JpaRepository<RadishCapsule, Long> {
    @Query("SELECT r FROM radish_capsule r WHERE r.isHarvested = true AND r.member.id = :memberId " +
            "AND r.createAt BETWEEN :startDate AND :endDate " +
            "ORDER BY r.createAt DESC")
    List<RadishCapsule> findHarvestedRadishByMemberAndDateRange(
            @Param("memberId") Long memberId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable);

    List<RadishCapsule> findAllByIsHarvestedAndMemberIdOrderByCreateAtDesc(boolean isHarvested, Long memberId, Pageable pageable);
    @Query("SELECT rc FROM radish_capsule rc WHERE rc.member.id = :memberId " +
            "AND rc.isHarvested = false " +
            "AND rc.lat BETWEEN :latBottomLeft AND :latTopRight " +
            "AND rc.lng BETWEEN :lngBottomLeft AND :lngTopRight " +
            "ORDER BY rc.createAt DESC")  // 역순 정렬 추가
    List<RadishCapsule> findUnharvestedCapsulesInArea(@Param("memberId") Long memberId,
                                                      @Param("latBottomLeft") Double latBottomLeft,
                                                      @Param("latTopRight") Double latTopRight,
                                                      @Param("lngBottomLeft") Double lngBottomLeft,
                                                      @Param("lngTopRight") Double lngTopRight);
}
