import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  form!: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    // initialize the form here – after fb is injected
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';

    // use getRawValue() to get strongly typed values (non-null)
    const payload = this.form.getRawValue() as { username: string; password: string };
    console.log("payload: ", payload);
    
    this.auth.login(payload).subscribe({
      next: (res) => {
        console.log("response: ", res);
        
        this.auth.setToken(res.accessToken);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log("errr: ", err);
        
        this.error = err?.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}
