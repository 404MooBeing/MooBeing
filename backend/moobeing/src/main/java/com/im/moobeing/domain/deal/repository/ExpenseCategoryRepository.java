package com.im.moobeing.domain.deal.repository;

import com.im.moobeing.domain.deal.entity.DealCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExpenseCategoryRepository extends JpaRepository<DealCategory, Long> {
    Optional<DealCategory> findByName(String name);
}
