import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { DashboardComponent } from './features/dashboard/dashboard';
import { AuthGuard } from './guards/auth-guard';
import { NotesListComponent } from './features/notes/notes-list/notes-list.component';
import { NoteFormComponent } from './features/notes/note-form/note-form.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    
    {
    path: 'notes',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: NotesListComponent },
      { path: 'new', component: NoteFormComponent },
      { path: ':id/edit', component: NoteFormComponent }
    ]
  },

    { path: '**', redirectTo: 'dashboard' }
];
