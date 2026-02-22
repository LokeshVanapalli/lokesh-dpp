import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../../../models/Note.model';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css'
})
export class NoteFormComponent {

  @Input() note!: Note;
  @Input() noteId: number | null = null;

  @Output() saved = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  loading = false;

  saveNote() {
    if(this.loading){
      return;
    }

    this.loading = true;
    
    this.saved.emit({
      id: this.noteId,
      title: this.note.title,
      content: this.note.content
    });
  }

  cancel() {
    this.cancelled.emit();
  }
}