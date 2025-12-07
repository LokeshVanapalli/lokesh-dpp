import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

// core/services/auth.service.ts
login(payload: { username: string; password: string }) {
  return this.http.post<{ accessToken: string; refreshToken?: string }>(`${this.api}/login`, payload);
}

register(payload: { username: string; email: string; password: string }) {
  return this.http.post(`${this.api}/register`, payload);
}

  logout() {
    localStorage.removeItem('access_token');
    // optionally call backend revoke endpoint
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
