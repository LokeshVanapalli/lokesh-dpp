package com.lokesh.dpp.service;

import com.lokesh.dpp.model.Note;
import com.lokesh.dpp.model.User;
import com.lokesh.dpp.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final UserService userService;

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new AuthenticationCredentialsNotFoundException("User is not authenticated");
        }

        return userService.getByUsername(auth.getName());
    }

    @Override
    public Note createNote(String title, String content) {
        User user = getCurrentUser();

        Note note = new Note();
        note.setTitle(title);
        note.setContent(content);
        note.setOwner(user);

        return noteRepository.save(note);
    }

    @Override
    public Page<Note> getUserNotes(Pageable pageable) {
        return noteRepository.findByOwner(getCurrentUser(), pageable);
    }

    @Override
    public Note getUserNoteById(Long noteId) {
        return noteRepository.findByIdAndOwner(noteId, getCurrentUser())
                .orElseThrow(() -> new AccessDeniedException("Note not found or access denied"));
    }

    @Override
    public Note updateNote(Long noteId, String title, String content) {
        Note note = getUserNoteById(noteId);
        note.setTitle(title);
        note.setContent(content);
        return noteRepository.save(note);
    }

    @Override
    public void deleteNote(Long noteId) {
        Note note = getUserNoteById(noteId);
        noteRepository.delete(note);
    }
}
