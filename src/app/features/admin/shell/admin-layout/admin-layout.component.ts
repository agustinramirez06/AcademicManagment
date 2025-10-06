import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
  <nav style="background:#222;padding:12px;color:white;">
    <a routerLink="/admin" style="color:white;">🏠 Inicio Admin</a>
  </nav>
  <div style="padding:20px;">
    <router-outlet></router-outlet>
  </div>
  `
})
export class AdminLayoutComponent {}
