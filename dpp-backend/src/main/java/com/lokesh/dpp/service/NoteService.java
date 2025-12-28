package com.lokesh.dpp.service;

import com.lokesh.dpp.model.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NoteService {

    Note createNote(String title, String content);

    Page<Note> getUserNotes(Pageable pageable);

    Note getUserNoteById(Long noteId);

    Note updateNote(Long noteId, String title, String content);

    void deleteNote(Long noteId);
}
