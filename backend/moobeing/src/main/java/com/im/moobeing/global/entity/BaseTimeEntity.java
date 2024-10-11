package com.im.moobeing.global.entity;
import java.time.LocalDateTime;

import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public abstract class BaseTimeEntity {
	@Column(name = "created_date", updatable = false)
	@CreatedDate
	@Setter // 주의 요망 -> 목 데이터 생성 테스트 용으로 구현
	private LocalDateTime createdDate;

	@Column(name="modified_date")
	@LastModifiedDate
	private LocalDateTime modifiedDate;
}
