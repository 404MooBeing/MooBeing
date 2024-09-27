package com.im.moobeing.domain.radish.entity;

import com.im.moobeing.domain.deal.entity.Deal;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BadRequestException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity(name = "radish_capsule")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RadishCapsule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "radish_capsule_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deal_id")
    private Deal deal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_id")
    private Radish character;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "img_url", length = 255)
    private String imgUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private CapsuleType type; // Assuming CapsuleType is an Enum

    @Column(name = "lat")
    private Double lat;

    @Column(name = "lng")
    private Double lng;

    @Column(name = "place_name", length = 255)
    private String placeName;

    @Column(name = "address_name", length = 255)
    private String addressName;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "end_at")
    private LocalDateTime endAt;

    @Column(name = "is_harvested")
    private boolean isHarvested;

    @Builder
    public RadishCapsule(Long id, Deal deal, Radish character, String description, String imgUrl, CapsuleType type,
                         Double lat, Double lng, String placeName, String addressName, LocalDateTime createAt, LocalDateTime endAt) {
        this.id = id;
        this.deal = deal;
        this.character = character;
        this.description = description;
        this.imgUrl = imgUrl;
        this.type = type;
        this.lat = lat;
        this.lng = lng;
        this.placeName = placeName;
        this.addressName = addressName;
        this.createAt = LocalDateTime.now();
        this.endAt = endAt;
    }

    public void harvest() {
        if (isHarvested) {
            throw new BadRequestException(ErrorCode.BAD_REQUEST);
        }
        isHarvested = true;
    }
}
