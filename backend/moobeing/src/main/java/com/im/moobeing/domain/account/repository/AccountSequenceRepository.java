package com.im.moobeing.domain.account.repository;

import com.im.moobeing.domain.account.entity.AccountSequence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountSequenceRepository extends JpaRepository<AccountSequence, Long> {

    @Modifying
    @Query("UPDATE AccountSequence a SET a.nextVal = a.nextVal + 1 WHERE a.seqName = :seqName")
    int incrementSequence(@Param("seqName") String seqName);

    @Query("SELECT a.nextVal FROM AccountSequence a WHERE a.seqName = :seqName")
    Long getNextVal(@Param("seqName") String seqName);
}
