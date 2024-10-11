package com.im.moobeing.domain.account.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "Account_Product")
public class AccountProduct {

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false)
    private String bankCode;

    @Column(nullable = false)
    private String accountName;

    @Column(nullable = false)
    private String accountDescription;

    @Column(nullable = true)
    private String accountTypeUniqueNo;

    @Column
    private String bankImage;
    @OneToMany(mappedBy = "accountProduct", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Account> accounts;
}