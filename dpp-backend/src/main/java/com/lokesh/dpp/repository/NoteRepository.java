package com.lokesh.dpp.repository;

import com.lokesh.dpp.model.Note;
import com.lokesh.dpp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    Page<Note> findByOwner(User owner, Pageable pageable);

    Page<Note> findByOwnerAndTitleContainingIgnoreCase(
            User owner, String keyword, Pageable pageable);

    Optional<Note> findByIdAndOwner(Long id, User owner);
}
