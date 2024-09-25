package com.im.moobeing.domain.radish.entity;

import com.im.moobeing.domain.deal.entity.Deal;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.im.moobeing.global.entity.BaseTimeEntity;

import java.time.LocalDate;

@Entity(name = "radish_capsule")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RadishCapsule extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "radish_capsule_id")
    private Long id;

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
    private LocalDate createAt;

    @Column(name = "end_at")
    private LocalDate endAt;

    @Builder
    public RadishCapsule(Long id, Deal deal, Radish character, String description, String imgUrl, CapsuleType type,
                         Double lat, Double lng, String placeName, String addressName, LocalDate createAt, LocalDate endAt) {
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
        this.createAt = createAt;
        this.endAt = endAt;
    }
}
