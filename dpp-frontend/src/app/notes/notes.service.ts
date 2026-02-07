import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private readonly baseUrl = 'api/notes';
  constructor(private http: HttpClient) { }

  getNotes(Page: number = 0, Size: number = 10): Observable<any> {
    return this.http.get(this.baseUrl, {
      params: new HttpParams()
        .set('Page', Page)
        .set('Size', Size)
    })
  }

  searchNotes(keyword: string, Page: number = 0, Size: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/search`, {
      params: new HttpParams()
        .set('keyword', keyword)
        .set('Page', Page)
        .set('Size', Size)
    })
  }

  createNote(data: {title: string, content: string}){
    return this.http.post(this.baseUrl, data);
  }

  updateNote(id: number, data: {title: string, content: string}) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteNote(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
