package com.im.moobeing.domain.expense.repository;

import com.im.moobeing.domain.expense.entity.DealCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExpenseCategoryRepository extends JpaRepository<DealCategory, Long> {
    Optional<DealCategory> findByName(String name);
}
