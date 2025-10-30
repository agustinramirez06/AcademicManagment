import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { usuario, password } = this.loginForm.value;
      const success = this.authService.loginWithCredentials(usuario, password);
      if (!success) {
        console.error('Invalid credentials');
      }
    }
  }

  loginDemo(usuario: string) {
    const success = this.authService.loginWithCredentials(usuario, 'demo');
    if (!success) {
      console.error('Demo login failed');
    }
  }
}
