package com.cvbuilder.controller;

import com.cvbuilder.dto.ResumeResponse;
import com.cvbuilder.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final ResumeService resumeService;

    @GetMapping("/resumes/{slug}")
    public ResponseEntity<ResumeResponse> getResumeBySlug(@PathVariable String slug) {
        ResumeResponse resume = resumeService.getResumeBySlug(slug);
        return ResponseEntity.ok(resume);
    }
}
