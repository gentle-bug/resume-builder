package com.cvbuilder.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeListResponse {

    private UUID id;
    private String title;
    private String slug;
    private String templateName;
    private LocalDateTime updatedAt;
}
