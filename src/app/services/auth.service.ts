import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarios = ['profesor1','alumno1','admin1','director1','tecnico1'];
  private passwordDemo = 'demo';

  constructor(private router: Router) {}

  login(usuario: string, password: string) {
    const u = (usuario || '').trim().toLowerCase();
    const p = (password || '').trim();

    if (this.usuarios.includes(u) && p === this.passwordDemo) {
      localStorage.setItem('user', u);

      if (u.startsWith('profesor')) {
        this.router.navigate(['/profesor']);
      } else if (u.startsWith('alumno')) {
        this.router.navigate(['/alumno']);
      } else if (u.startsWith('admin')) {
        this.router.navigate(['/admin']);
      } else if (u.startsWith('director')) {
        this.router.navigate(['/director']);
      } else if (u.startsWith('tecnico')) {
        this.router.navigate(['/tecnico']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
