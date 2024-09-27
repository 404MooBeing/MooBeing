package com.im.moobeing.domain.account.repository;

import com.im.moobeing.domain.account.entity.AccountProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountProductRepository extends JpaRepository<AccountProduct, Long> {
    boolean existsByBankCodeAndAccountName(String bankCode, String accountName);

    Optional<AccountProduct> findByAccountName(String accountName);
}