import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css'
})
export class NoteFormComponent {

  loading = false;
  error = '';
  notesService: any;
  notes: any;
  totalPages: any;

  loadNotes() {
  this.loading = true;
  this.error = '';

  this.notesService.getNotes(this.page).subscribe({
    next: (res: any) => {
      this.notes = res.content;
      this.totalPages = res.totalPages;
      this.loading = false;
    },
    error: (err: any) => {
      this.error = err.error?.message || 'Failed to load notes';
      this.loading = false;
    }
  });
}
  page(page: any) {
    throw new Error('Method not implemented.');
  }

}
