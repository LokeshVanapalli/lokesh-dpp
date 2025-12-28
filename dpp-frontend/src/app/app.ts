import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="app-shell">
      <nav class="nav">
        <a routerLink="/dashboard">DPP</a>
        <a routerLink="/login">Login</a>
        <a routerLink="/register">Register</a>
      </nav>
      <main class="main"><router-outlet></router-outlet></main>
    </div>
  `,
  styles: [`
    .nav { display:flex; gap:16px; padding:12px; background:#0b2545; color:white; }
    .nav a { color: #fff; text-decoration:none; cursor:pointer; }
    .main { padding:24px; }
  `]
})
export class AppComponent {}
