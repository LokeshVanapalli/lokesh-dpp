import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { NotesService } from '../../../services/notes.service';
import { NoteFormComponent } from "../note-form/note-form.component";
import { Note } from '../../../models/Note.model';
import { PageResponse } from '../../../models/pageResponse.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, NgIf, NoteFormComponent, FormsModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})

export class NotesListComponent {

  loading = false;
  error = '';
  currentPage = 0;
  pageSize = 20;
  notes: Note[] = [];
  totalPages = 0;

  editMode: boolean = false;
  createMode: boolean = false;

  selectedNote: any = null;
  selectedNoteId: number | null = null;

  searchTerm: string = '';

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.loading = true;
    this.error = '';
    console.log("page: ",this.currentPage);
    console.log("page size: ",this.pageSize);
    
    this.notesService.getNotes(this.currentPage, this.pageSize, this.searchTerm).subscribe({
      next: (res: PageResponse<Note>) => {
        console.log(res);
        
        this.notes = res.content;
        this.totalPages = res.totalPages;
        this.loading = false;
      },
      error: (err: Error) => {
        console.log("Notes error: ",err);
        
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  changePage(page: number) {
    if(page < 0 || page >= this.totalPages) {
      return;
    }

    this.currentPage = page;
    this.loadNotes();
  }

  deleteNote(id: number) {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    this.notesService.deleteNote(id).subscribe(() => {
      
      if(this.notes.length === 1 && this.currentPage > 0) {
        this.currentPage--;
      }
      
      this.loadNotes();
    });
  }

  editNote(id: number, note: Note) {
    this.selectedNote = { ...note };
    this.selectedNoteId = id;
    this.editMode = true;
    this.createMode = false;
  }

  openCreate() {
    this.selectedNote = { title: '', content: '' };
    this.selectedNoteId = null;
    this.createMode = true;
    this.editMode = false;
  }

  onNoteSaved(data: any) {
    if (data.id) {
      
      this.notesService.updateNote(data.id, {title: data.title, content: data.content}).subscribe(() => {
        this.loadNotes();
      });
    } else {
      this.notesService.createNote({title: data.title,  content: data.content}).subscribe(() => {
        this.loadNotes();
      });
    }

    this.editMode = false;
    this.createMode = false;
  }

  closeForm() {
    this.editMode = false;
    this.createMode = false;
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  onSearch() {
    this.currentPage = 0;
    this.loadNotes();
  }
}
