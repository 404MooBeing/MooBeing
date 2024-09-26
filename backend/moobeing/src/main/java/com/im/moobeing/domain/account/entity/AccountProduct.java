package com.im.moobeing.domain.account.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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
}