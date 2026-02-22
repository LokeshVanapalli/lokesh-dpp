import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = `${environment.apiUrl}/auth`;

  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(payload: { username: string; password: string }) {
    return this.http.post<{ accessToken: string; refreshToken?: string }>(
      `${this.api}/login`,
      payload
    );
  }

  register(payload: { username: string; email: string; password: string }) {
    return this.http.post(`${this.api}/register`, payload);
  }

  handleLogin(token: string) {
    localStorage.setItem('access_token', token);
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}