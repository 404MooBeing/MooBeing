package com.im.moobeing.domain.member.repository;

import com.im.moobeing.domain.member.entity.Nickname;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NicknameRepository extends JpaRepository<Nickname, Long> {
    Optional<Nickname> findByNickname(String nickname);
}
