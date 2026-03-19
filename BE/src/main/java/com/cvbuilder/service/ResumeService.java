package com.cvbuilder.service;

import com.cvbuilder.dto.ResumeListResponse;
import com.cvbuilder.dto.ResumeRequest;
import com.cvbuilder.dto.ResumeResponse;
import com.cvbuilder.entity.Resume;
import com.cvbuilder.entity.User;
import com.cvbuilder.exception.ResourceNotFoundException;
import com.cvbuilder.repository.ResumeRepository;
import com.cvbuilder.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    @Transactional
    public ResumeResponse createResume(UUID userId, ResumeRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        String slug = generateUniqueSlug(request.getTitle());

        Resume resume = Resume.builder()
                .user(user)
                .title(request.getTitle())
                .slug(slug)
                .templateName(request.getTemplateName() != null ? request.getTemplateName() : "cabernet")
                .data(request.getData())
                .build();

        resume = resumeRepository.save(resume);
        return mapToResponse(resume);
    }

    @Transactional
    public ResumeResponse updateResume(UUID userId, UUID resumeId, ResumeRequest request) {
        Resume resume = resumeRepository.findByIdAndUserId(resumeId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", "id", resumeId));

        resume.setTitle(request.getTitle());
        if (request.getTemplateName() != null) {
            resume.setTemplateName(request.getTemplateName());
        }
        resume.setData(request.getData());

        resume = resumeRepository.save(resume);
        return mapToResponse(resume);
    }

    @Transactional
    public void deleteResume(UUID userId, UUID resumeId) {
        Resume resume = resumeRepository.findByIdAndUserId(resumeId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", "id", resumeId));
        resumeRepository.delete(resume);
    }

    @Transactional(readOnly = true)
    public ResumeResponse getResume(UUID userId, UUID resumeId) {
        Resume resume = resumeRepository.findByIdAndUserId(resumeId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", "id", resumeId));
        return mapToResponse(resume);
    }

    @Transactional(readOnly = true)
    public List<ResumeListResponse> getAllResumes(UUID userId) {
        return resumeRepository.findAllByUserIdOrderByUpdatedAtDesc(userId).stream()
                .map(this::mapToListResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ResumeResponse getResumeBySlug(String slug) {
        Resume resume = resumeRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", "slug", slug));
        return mapToResponse(resume);
    }

    @Transactional
    public ResumeResponse uploadAvatar(UUID userId, UUID resumeId, MultipartFile file) throws IOException {
        Resume resume = resumeRepository.findByIdAndUserId(resumeId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", "id", resumeId));

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed");
        }

        resume.setAvatar(file.getBytes());
        resume.setAvatarType(contentType);
        resume = resumeRepository.save(resume);
        return mapToResponse(resume);
    }

    @Transactional(readOnly = true)
    public String exportResumeJson(UUID userId, UUID resumeId) {
        Resume resume = resumeRepository.findByIdAndUserId(resumeId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", "id", resumeId));
        return "{\"title\":" + toJsonString(resume.getTitle())
                + ",\"templateName\":" + toJsonString(resume.getTemplateName())
                + ",\"data\":" + (resume.getData() != null ? resume.getData() : "{}")
                + "}";
    }

    @Transactional
    public ResumeResponse importResumeJson(UUID userId, String title, String templateName, String jsonData) {
        ResumeRequest request = ResumeRequest.builder()
                .title(title)
                .templateName(templateName != null ? templateName : "azurill")
                .data(jsonData)
                .build();
        return createResume(userId, request);
    }

    private String toJsonString(String value) {
        if (value == null) return "null";
        return "\"" + value.replace("\\", "\\\\").replace("\"", "\\\"") + "\"";
    }

    private ResumeResponse mapToResponse(Resume resume) {
        String avatarUrl = null;
        if (resume.getAvatar() != null) {
            avatarUrl = "/api/resumes/" + resume.getId() + "/avatar";
        }

        return ResumeResponse.builder()
                .id(resume.getId())
                .title(resume.getTitle())
                .slug(resume.getSlug())
                .templateName(resume.getTemplateName())
                .data(resume.getData())
                .avatarUrl(avatarUrl)
                .createdAt(resume.getCreatedAt())
                .updatedAt(resume.getUpdatedAt())
                .build();
    }

    private ResumeListResponse mapToListResponse(Resume resume) {
        return ResumeListResponse.builder()
                .id(resume.getId())
                .title(resume.getTitle())
                .slug(resume.getSlug())
                .templateName(resume.getTemplateName())
                .updatedAt(resume.getUpdatedAt())
                .build();
    }

    private String generateUniqueSlug(String title) {
        String slug = toSlug(title);
        String baseSlug = slug;
        int counter = 1;

        while (resumeRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter;
            counter++;
        }

        return slug;
    }

    private String toSlug(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        String withoutAccents = normalized.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        String slug = WHITESPACE.matcher(withoutAccents).replaceAll("-");
        slug = NON_LATIN.matcher(slug).replaceAll("");
        slug = slug.toLowerCase(Locale.ENGLISH);
        slug = slug.replaceAll("-{2,}", "-");
        slug = slug.replaceAll("^-|-$", "");
        return slug.isEmpty() ? UUID.randomUUID().toString().substring(0, 8) : slug;
    }
}
