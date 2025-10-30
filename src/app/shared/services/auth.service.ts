import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: string;
  email?: string;
  displayName?: string;
  role?: 'admin' | 'profesor' | 'alumno' | 'director' | 'tecnico';
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$ = new BehaviorSubject<User | null>(this.read());
  user$ = this._user$.asObservable();

  constructor(private router: Router) {}

  private read(): User | null {
    const raw = localStorage.getItem('session');
    return raw ? JSON.parse(raw) as User : null;
  }

  private write(user: User | null): void {
    if (user) {
      localStorage.setItem('session', JSON.stringify(user));
    } else {
      localStorage.removeItem('session');
    }
  }

  // Usuarios demo para login por credenciales (usuario/demo)
  private DEMO_USERS: Record<string, { pass: string; role: User['role'] }> = {
    profesor1: { pass: 'demo', role: 'profesor' },
    alumno1: { pass: 'demo', role: 'alumno' },
    admin1: { pass: 'demo', role: 'admin' },
    director1: { pass: 'demo', role: 'director' },
    tecnico1: { pass: 'demo', role: 'tecnico' },
  };

  /** Intento de login por credenciales (usuario + pass). Retorna true si coincide con DEMO_USERS */
  loginWithCredentials(identifier: string, password: string): boolean {
    // soporta tanto 'usuario' como 'usuario@dominio' -> extraer la parte antes de @
    const username = identifier.split('@')[0];
    const  demo = this.DEMO_USERS[username];
    if (demo && demo.pass === password) {
      const user: User = {
        id: username,
        email: `${username}@demo.local`,
        displayName: username,
        role: demo.role,
        token: 'demo-token'
      };
      this.login(user);
      return true;
    }
    return false;
  }

  /** Devuelve el usuario actual sincronizado */
  currentUser(): User | null {
    return this._user$.value;
  }

  private navigate(role: User['role']): void {
    console.log('Navigating for role:', role);
    switch (role) {
      case 'admin':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'profesor':
        // la ruta del profesor tiene el dashboard en la ruta base '/profesor'
        this.router.navigate(['/profesor']);
        break;
      case 'alumno':
        this.router.navigate(['/alumno/dashboard']);
        break;
      case 'director':
        this.router.navigate(['/director/dashboard']);
        break;
      case 'tecnico':
        this.router.navigate(['/tecnico/dashboard']);
        break;
      default:
        this.router.navigate(['/auth/login']);
    }
  }

  login(user: User): void {
    console.log('Logging in user:', user);
    this.write(user);
    this._user$.next(user);
    if (user.role) {
      this.navigate(user.role);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  logout(): void {
    this.write(null);
    this._user$.next(null);
    this.router.navigate(['/auth/login']);
  }

  get isLoggedIn(): boolean {
    return !!this._user$.value;
  }
}

