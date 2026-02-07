import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent {

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

  deleteNote(id: number) {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    this.notesService.deleteNote(id).subscribe(() => {
      this.loadNotes();
    });
  }

}
