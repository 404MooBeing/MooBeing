package com.im.moobeing.domain.radish.dto.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateRadishCapsuleRequest {

    private Long dealId;
    private MultipartFile imgFile;
    private String description;
    private String type;
    private Double lat;
    private Double lng;
    private String addressName;
    private String placeName;
}