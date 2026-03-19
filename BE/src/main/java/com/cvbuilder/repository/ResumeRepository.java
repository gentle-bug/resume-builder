package com.cvbuilder.repository;

import com.cvbuilder.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, UUID> {

    List<Resume> findAllByUserIdOrderByUpdatedAtDesc(UUID userId);

    Optional<Resume> findByIdAndUserId(UUID id, UUID userId);

    Optional<Resume> findBySlug(String slug);

    boolean existsBySlug(String slug);
}
