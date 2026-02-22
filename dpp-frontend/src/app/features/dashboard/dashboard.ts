import { Component } from '@angular/core';
import { Note } from '../../models/Note.model';
import { PageResponse } from '../../models/pageResponse.model';
import { NotesService } from '../../services/notes.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [NgIf, NgFor]
})
export class DashboardComponent {

  totalNotes = 0;
  recentNotes: Note[] = [];
  loading = false;
  error = "";

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.notesService.getRecentNotes(5).subscribe({
      next: (res: PageResponse<Note>) => {
        this.totalNotes = res.totalElements;
        this.recentNotes = res.content;
        this.loading = false;
      },
      error: (err: Error) => {
        this.error = err.message;
        this.loading = false;
      }
    })
  }
}
