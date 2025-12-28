import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { RegisterResponse } from '../../../models/auth-model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  form!: FormGroup;
  loading = false;
  msg: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;

    // getRawValue() returns the values with the shape we expect
    const payload = this.form.getRawValue() as { username: string; email: string; password: string };
    console.log("Reg payload: ",payload);
    
    this.auth.register(payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.msg = (res as RegisterResponse).message;
        console.log("registered: ", res);
        console.log("msg: ", this.msg);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 4000);
      },
      error: (err) => {
        console.log("registered ERR: ", err);
        this.msg = err?.error?.message || 'Registration failed';
        this.loading = false;
      }
    });
  }
}
