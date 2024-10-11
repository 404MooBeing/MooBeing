package com.im.moobeing.domain.radish.repository;

import com.im.moobeing.domain.radish.entity.RadishTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RadishTimeRepository extends JpaRepository<RadishTime, Long> {
    List<RadishTime> findAllByMemberId(Long id);
}
