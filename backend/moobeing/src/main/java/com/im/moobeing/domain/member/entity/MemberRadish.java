package com.im.moobeing.domain.member.entity;

import com.im.moobeing.domain.radish.entity.Radish;
import com.im.moobeing.global.entity.BaseTimeEntity;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BadRequestException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "member_radish")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberRadish extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_radish_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "radish_id", nullable = false)
    private Radish radish;

    @Column(name = "radish_number", nullable = true)
    private Long radishNumber;

    @Builder
    public MemberRadish(Member member, Radish radish, Long radishNumber) {
        this.member = member;
        this.radish = radish;
        this.radishNumber = radishNumber;
    }

    public void addRadishNumber() {
        this.radishNumber++;
    }

    public void minus5() { this.radishNumber = this.radishNumber-5;
    }

    public void minusRadishNumber() {
        if (this.id == 1) return;
        if (this.radishNumber == 0) {
            throw new BadRequestException(ErrorCode.BAD_REQUEST);
        }
        this.radishNumber--;
    }
}
