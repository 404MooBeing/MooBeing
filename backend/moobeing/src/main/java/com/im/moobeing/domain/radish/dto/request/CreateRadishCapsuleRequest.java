package com.im.moobeing.domain.radish.dto.request;

import com.im.moobeing.domain.radish.entity.CapsuleType;
import lombok.*;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CreateRadishCapsuleRequest {

    private Long dealId;
    @Nullable
    private MultipartFile imgFile;
    private String description;
    private CapsuleType type;
    private Double lat;
    private Double lng;
    private String addressName;
    private String placeName;
    private Long radishId;
}