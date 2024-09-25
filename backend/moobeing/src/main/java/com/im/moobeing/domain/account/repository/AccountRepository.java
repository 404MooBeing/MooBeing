package com.im.moobeing.domain.account.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.im.moobeing.domain.account.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
	List<Account> findByMemberId(Long memberId);

	Optional<Account> findByMemberIdAndAccountNum(Long id, String accountNum);
	Optional<Account> findByAccountNum(String accountNum);
}
