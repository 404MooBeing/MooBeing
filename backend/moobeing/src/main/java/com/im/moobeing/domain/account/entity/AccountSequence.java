package com.im.moobeing.domain.account.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "account_sequence")
@Getter
@Setter
@NoArgsConstructor
public class AccountSequence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "seq_name", unique = true)
    private String seqName;

    @Column(name = "next_val")
    private Long nextVal;
}
