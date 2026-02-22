import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponse } from '../models/pageResponse.model';
import { environment } from '../environments/environment';
import { Note } from '../models/Note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private readonly noteUrl = `${environment.apiUrl}/notes`;
  constructor(private http: HttpClient) { }

  getNotes(Page: number = 0, Size: number = 10, keyword: string = ''): Observable<PageResponse<Note>> {

    let params = new HttpParams()
      .set('page', Page.toString())
      .set('size', Size.toString());

    if (keyword.trim()) {
      params = params.set('keyword', keyword.trim())
    }
    return this.http.get<PageResponse<Note>>(this.noteUrl, {
      params: params
    })
  }

  searchNotes(keyword: string, Page: number = 0, Size: number = 10): Observable<any> {
    return this.http.get(`${this.noteUrl}/search`, {
      params: new HttpParams()
        .set('keyword', keyword)
        .set('page', Page.toString())
        .set('size', Size.toString())
    })
  }

  createNote(data: {title: string, content: string}){
    return this.http.post(this.noteUrl, data);
  }

  updateNote(id: number, data: {title: string, content: string}) {
    return this.http.put(`${this.noteUrl}/${id}`, data);
  }

  deleteNote(id: number) {
    return this.http.delete(`${this.noteUrl}/${id}`);
  }

  getRecentNotes(limit = 5): Observable<PageResponse<Note>> {
  const params = new HttpParams()
    .set('page', '0')
    .set('size', limit.toString())
    .set('sort', 'createdAt,desc');

    return this.http.get<PageResponse<Note>>(this.noteUrl, { params });
  }
}
