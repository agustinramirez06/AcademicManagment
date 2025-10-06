import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  selector: 'app-alumno-layout',
  template: `
  <nav style="background:#0077b6;padding:12px;color:white;">
    <a routerLink="/alumno" style="color:white;margin-right:10px;">🏠 Inicio</a>
    <a routerLink="/alumno/perfil" style="color:white;">Perfil</a>
  </nav>
  <div style="padding:20px;">
    <router-outlet></router-outlet>
  </div>
  `
})
export class AlumnoLayoutComponent {}
