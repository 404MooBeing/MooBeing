package com.im.moobeing.domain.alarm.repository;

import com.im.moobeing.domain.alarm.entity.Alarm;
import com.im.moobeing.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    List<Alarm> findAllByMemberAndCreatedAtAfter(Member member, LocalDateTime createdAt);

    void deleteAllByMember(Member member);

    boolean existsByMember(Member member);
}
