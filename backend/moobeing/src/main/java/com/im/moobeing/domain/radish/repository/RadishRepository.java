package com.im.moobeing.domain.radish.repository;

import com.im.moobeing.domain.radish.entity.Radish;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RadishRepository extends JpaRepository<Radish, Long> {
    Optional<Radish> findByRadishName(String radishName);
}
