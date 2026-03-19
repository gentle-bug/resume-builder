package com.cvbuilder.controller;

import com.cvbuilder.dto.ResumeListResponse;
import com.cvbuilder.dto.ResumeRequest;
import com.cvbuilder.dto.ResumeResponse;
import com.cvbuilder.entity.User;
import com.cvbuilder.service.ResumeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @GetMapping
    public ResponseEntity<List<ResumeListResponse>> getAllResumes(@AuthenticationPrincipal User user) {
        List<ResumeListResponse> resumes = resumeService.getAllResumes(user.getId());
        return ResponseEntity.ok(resumes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeResponse> getResume(
            @AuthenticationPrincipal User user,
            @PathVariable UUID id
    ) {
        ResumeResponse resume = resumeService.getResume(user.getId(), id);
        return ResponseEntity.ok(resume);
    }

    @PostMapping
    public ResponseEntity<ResumeResponse> createResume(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ResumeRequest request
    ) {
        ResumeResponse resume = resumeService.createResume(user.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(resume);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResumeResponse> updateResume(
            @AuthenticationPrincipal User user,
            @PathVariable UUID id,
            @Valid @RequestBody ResumeRequest request
    ) {
        ResumeResponse resume = resumeService.updateResume(user.getId(), id, request);
        return ResponseEntity.ok(resume);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(
            @AuthenticationPrincipal User user,
            @PathVariable UUID id
    ) {
        resumeService.deleteResume(user.getId(), id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/{id}/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResumeResponse> uploadAvatar(
            @AuthenticationPrincipal User user,
            @PathVariable UUID id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        ResumeResponse resume = resumeService.uploadAvatar(user.getId(), id, file);
        return ResponseEntity.ok(resume);
    }

    @GetMapping(value = "/{id}/export-json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> exportJson(
            @AuthenticationPrincipal User user,
            @PathVariable UUID id
    ) {
        String json = resumeService.exportResumeJson(user.getId(), id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=resume.json")
                .contentType(MediaType.APPLICATION_JSON)
                .body(json);
    }

    @PostMapping("/import-json")
    public ResponseEntity<ResumeResponse> importJson(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> payload
    ) {
        String title = payload.getOrDefault("title", "Imported Resume");
        String templateName = payload.get("templateName");
        String data = payload.get("data");
        if (data == null || data.isBlank()) {
            throw new IllegalArgumentException("JSON data is required");
        }
        ResumeResponse resume = resumeService.importResumeJson(user.getId(), title, templateName, data);
        return ResponseEntity.status(HttpStatus.CREATED).body(resume);
    }
}
