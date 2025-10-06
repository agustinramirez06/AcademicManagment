import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
  <nav style="background:#1e6091;padding:12px;color:white;">
    <a routerLink="/tecnico" style="color:white;">🏠 Inicio Técnico</a>
  </nav>
  <div style="padding:20px;">
    <router-outlet></router-outlet>
  </div>
  `
})
export class TecnicoLayoutComponent {}
