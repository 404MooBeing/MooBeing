package com.im.moobeing.domain.radish.controller;

import com.im.moobeing.domain.radish.dto.request.CreateRadishCapsuleRequest;
import com.im.moobeing.domain.radish.service.RadishService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/radish")
@RequiredArgsConstructor
public class RadishController {

    private final RadishService radishService;

    @PostMapping
    public ResponseEntity<String> createRadishCapsule(@ModelAttribute CreateRadishCapsuleRequest requestDto) {

        return ResponseEntity.ok("Radish capsule created successfully!");
    }

}