package com.im.moobeing.domain.radish.entity;

import com.im.moobeing.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "radish_time")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RadishTime extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "radish_time_id")
    private Long id;

    @Column(name = "member_id")
    private Long memberId;

    @Builder
    public RadishTime(Long id, Long memberId) {
        this.id = id;
        this.memberId = memberId;
    }
}
