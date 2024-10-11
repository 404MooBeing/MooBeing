package com.im.moobeing.domain.member.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@RequiredArgsConstructor
public class Nickname {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickname;

    @Column
    private Long nextSequence;

    public Nickname(String nickname, Long nextSequence) {
        this.nickname = nickname;
        this.nextSequence = nextSequence;
    }

    public String getNickname() {
        return nickname + " " + nextSequence;
    }
}
