package com.im.moobeing.domain.alarm.entity;

import com.im.moobeing.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "icon_name", nullable = false)
    private AlarmIconType iconName;  // MOOBTI, QUIZ, TIME

    private String message;

    private LocalDateTime createdAt;

    @Builder
    public Alarm(Member member, AlarmIconType iconName, String title, String message, LocalDateTime createdAt) {
        this.member = member;
        this.iconName = iconName;
        this.title = title;
        this.message = message;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }
}
