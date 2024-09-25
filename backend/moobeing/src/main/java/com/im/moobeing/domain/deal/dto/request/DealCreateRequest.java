package com.im.moobeing.domain.deal.dto.request;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DealCreateRequest {
    @NonNull
    String title;
    long price;
    @NonNull
    String category;
    @NonNull
    LocalDate localDate;
}


