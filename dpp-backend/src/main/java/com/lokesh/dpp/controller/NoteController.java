package com.lokesh.dpp.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lokesh.dpp.dto.NoteRequestDto;
import com.lokesh.dpp.dto.NoteResponseDto;
import com.lokesh.dpp.model.Note;
import com.lokesh.dpp.service.NoteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @PostMapping
    public NoteResponseDto createNote(@Valid @RequestBody NoteRequestDto request){
        Note note = noteService.createNote(request.getTitle(), request.getContent());
        return mapToResponse(note);
    }

    @GetMapping
    public Page<NoteResponseDto> getNotes(Pageable pageable){
        return noteService.getUserNotes(pageable)
                .map(this::mapToResponse);
    }

    @GetMapping("/{id}")
    public NoteResponseDto getNote(@PathVariable Long id){
        return mapToResponse(noteService.getUserNoteById(id));
    }

    @GetMapping("/search")
    public Page<NoteResponseDto> searchNotes(@RequestParam String keyword, Pageable pageable){
        return noteService.searchUserNotes(keyword, pageable)
                .map(this::mapToResponse);
    }

    @PutMapping("/{id}")
    public NoteResponseDto updateNote(@PathVariable Long id, @Valid @RequestBody NoteRequestDto note){
        return mapToResponse(noteService.updateNote(id, note.getTitle(), note.getContent()));
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id){
        noteService.deleteNote(id);
    }

    private NoteResponseDto mapToResponse(Note note){
        NoteResponseDto response  = new NoteResponseDto();

        response.setId(note.getId());
        response.setTitle(note.getTitle());
        response.setContent(note.getContent());
        response.setCreatedAt(note.getCreatedAt());
        response.setUpdatedAt(note.getUpdatedAt());
        return response;
    }
}


