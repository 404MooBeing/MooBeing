package com.im.moobeing.domain.loan.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.im.moobeing.domain.loan.entity.LoanProduct;

public interface LoanProductRepository extends JpaRepository<LoanProduct, Long> {
	Optional<LoanProduct> findByLoanName(String loanProductName);
}
