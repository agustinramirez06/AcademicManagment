import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
  <nav style="background:#005f73;padding:12px;color:white;">
    <a routerLink="/director" style="color:white;">🏠 Inicio Director</a>
  </nav>
  <div style="padding:20px;">
    <router-outlet></router-outlet>
  </div>
  `
})
export class DirectorLayoutComponent {}
