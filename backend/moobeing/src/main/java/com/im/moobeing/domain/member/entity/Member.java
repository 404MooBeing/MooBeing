package com.im.moobeing.domain.member.entity;

import com.im.moobeing.domain.account.entity.Account;
import com.im.moobeing.domain.member.dto.request.MemberChangeRequest;
import com.im.moobeing.domain.member.dto.request.MemberPwChangeRequest;
import com.im.moobeing.global.entity.BaseTimeEntity;
import com.im.moobeing.global.fcm.entity.PushSubscription;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity(name="member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "email", nullable = false, length = 40)
    private String email;

    @Column(name = "password", nullable = false, length = 20)
    private String password;

    @Column(name = "total_points", nullable = true)
    private Long totalPoints = 0L;

    @Column(name = "name", nullable = true, length = 50)
    private String name;

    @Column(name = "gender", nullable = true, length = 10)
    private String gender;

    @Column(name = "birthday", nullable = true, length = 60)
    private String birthday;

    @Column(name = "user_key", nullable = true, length = 255)
    private String userKey;

    @Column(name = "selected_radish_id", nullable = true)
    private Long selectedRadishId = 1L;

    @Setter
    @Column(name = "month_complete", nullable = true, length = 255)
    private MonthStatus monthComplete = MonthStatus.FALSE;

    @Column(name = "month_aver", nullable = true, length = 255)
    private Long monthAver;

    @Setter
    @Column
    private Boolean isGoodMember;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<MemberRadish> memberRadishes = new ArrayList<>();

    @Column
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Account> accounts = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<PushSubscription> pushSubscriptions = new ArrayList<>(); // 여러 개의 푸시 구독

    @Setter
    @Column
    private LocalDate lastSolvedAt;

    @Builder
    public Member(Long id, String email, String password, Long totalPoints, String name, String gender, String birthday, String userKey, Long selectedRadishId, String nickname, LocalDate lastSolvedAt, Boolean isGoodMember) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.totalPoints = totalPoints;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.userKey = userKey;
        this.selectedRadishId = selectedRadishId;
        this.nickname = nickname;
        this.lastSolvedAt = lastSolvedAt;
    }

    public void changeMember(MemberChangeRequest memberChangeRequest){
        this.name = memberChangeRequest.getName();
    }

    public void changeMemberPw(MemberPwChangeRequest memberPwChangeRequest){
        this.password = memberPwChangeRequest.getNewPassword();
    }

    public void addMemberRadish(MemberRadish memberRadish) {
        this.memberRadishes.add(memberRadish);
    }

    public void setMemberRadishId(Long selectedRadishId) {
        this.selectedRadishId = selectedRadishId;
    }
    public void addPushSubscription(PushSubscription pushSubscription) {
        this.pushSubscriptions.add(pushSubscription);
        pushSubscription.setMember(this);
    }

    public void removePushSubscription(PushSubscription pushSubscription) {
        this.pushSubscriptions.remove(pushSubscription);
        pushSubscription.setMember(null);
    }
}
