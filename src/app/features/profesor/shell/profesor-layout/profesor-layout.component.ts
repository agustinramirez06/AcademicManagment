import { Component, ViewChild, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
<<<<<<< Updated upstream
import { NgFor } from '@angular/common';                  // 👈 agregado
=======
>>>>>>> Stashed changes
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
<<<<<<< Updated upstream
import { AuthService } from '../../../../services/auth.service';
=======
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
>>>>>>> Stashed changes

import { AuthService } from '../../../../services/auth.service';
import { NotificacionesFacade } from '../../services/notificaciones.facade';
import { PerfilDialogComponent } from '../../components/perfil-dialog/perfil-dialog.component';

type NavItem = { label: string; icon: string; link: string };

@Component({
  standalone: true,
  selector: 'app-profesor-layout',
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatIconModule, MatMenuModule, MatButtonModule, MatBadgeModule,
    MatSidenavModule, MatListModule, MatDialogModule
  ],
<<<<<<< Updated upstream
  template: `
  <header class="shell">
    <div class="glass topbar">
      <a class="brand" routerLink="/profesor">
        <img class="logo" src="assets/logo.png" alt="Instituto" />
        <div class="brand-text">
          <span class="title">Instituto del Profesorado</span>
          <span class="subtitle">Francisco de Paula Robles</span>
        </div>
        <span class="role-badge">Profesor</span>
      </a>

      <nav class="nav">
        <a *ngFor="let item of nav()"
           class="nav-link"
           [routerLink]="item.link"
           routerLinkActive="active"
           #rla="routerLinkActive"
           [attr.aria-current]="rla.isActive ? 'page' : null">
          <mat-icon class="ni">{{item.icon}}</mat-icon>
          <span>{{ item.label }}</span>
        </a>
      </nav>

      <div class="actions">
        <button mat-icon-button matBadge="1" matBadgeColor="warn">
          <mat-icon>notifications</mat-icon>
        </button>

        <button mat-icon-button>
          <mat-icon>help_outline</mat-icon>
        </button>

        <button mat-button class="user" [matMenuTriggerFor]="userMenu">
          <span class="avatar">{{ initials() }}</span>
          <span class="name">{{ displayName() }}</span>
          <mat-icon>expand_more</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu" xPosition="before">
          <button mat-menu-item disabled>
            <mat-icon>person</mat-icon><span>Mi perfil</span>
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>logout</mat-icon><span>Cerrar sesión</span>
          </button>
        </mat-menu>
      </div>
    </div>
  </header>

  <main class="page">
    <router-outlet/>
  </main>
  `,
  styles: [`
  :host {
    --bg:#0b1220;
    --panel:#0f172a;
    --text:#e5e7eb;
    --muted:#9aa3b2;
    --brand:#b91c1c;
    --brand-hover:#dc2626;
    --stroke:rgba(255,255,255,.08);
    --hover:rgba(255,255,255,.10);
    --maxw:1440px;
    display:block;
    background:var(--bg);
    color:var(--text);
    min-height:100vh;
  }

  .shell { position:sticky; top:0; z-index:100; backdrop-filter:saturate(1.1) blur(10px); }
  .glass {
    margin:10px auto;
    max-width:var(--maxw);
    background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
    border:1px solid var(--stroke);
    border-radius:18px;
    display:flex;
    align-items:center;
    gap:16px;
    padding:10px 14px;
    box-shadow:0 10px 40px rgba(0,0,0,.35);
  }

  .brand {
    display:flex; align-items:center; gap:12px;
    text-decoration:none; color:inherit;
    padding:6px 10px; border-radius:12px;
  }
  .brand:hover { background:var(--hover); }
  .logo { width:34px; height:34px; border-radius:9px; object-fit:cover; }
  .brand-text { display:flex; flex-direction:column; line-height:1.05; }
  .title { font-weight:700; }
  .subtitle { font-size:10px; color:var(--muted); }
  .role-badge {
    margin-left:6px;
    font-size:10px;
    padding:4px 10px;
    border-radius:999px;
    background:var(--brand);
    color:#fff;
    border:1px solid rgba(255,255,255,.18);
  }

  /* nav */
  .nav {
    display:flex;
    align-items:center;
    gap:4px;
    margin-left:8px;
    overflow:auto hidden;
    scrollbar-width:none;
  }
  .nav::-webkit-scrollbar { display:none; }

  .nav-link {
    position:relative;
    display:flex;
    align-items:center;
    gap:8px;
    padding:8px 14px;
    border-radius:10px;
    color:var(--text);
    text-decoration:none;
    transition:background .2s ease, transform .15s ease;
  }

  .nav-link:hover {
    background:var(--hover);
    transform:translateY(-1px);
  }

  /* estilo activo */
  .nav-link.active {
    background:var(--brand);
    color:#fff;
    box-shadow:0 0 0 2px rgba(185,28,28,.6);
  }

  .nav-link.active:hover {
    background:var(--brand-hover);
  }

  .nav-link .ni { font-size:20px; opacity:.9; }

  /* acciones */
  .actions {
    margin-left:auto;
    display:flex;
    align-items:center;
    gap:6px;
  }
  .user {
    padding:4px 8px;
    border-radius:12px;
    text-transform:none;
    color:var(--text);
  }
  .user:hover { background:var(--hover); }
  .avatar {
    width:28px;
    height:28px;
    border-radius:50%;
    background:var(--brand);
    display:inline-grid;
    place-items:center;
    color:#fff;
    font-weight:800;
    margin-right:6px;
    letter-spacing:.5px;
  }
  .name { margin-right:4px; }

  .page {
    padding:18px;
    max-width:var(--maxw);
    margin:0 auto 40px;
  }

  @media (max-width: 1100px) { .subtitle { display:none; } }
  @media (max-width: 820px)  {
    .nav-link span:not(.ni) { display:none; }
    .name, .role-badge { display:none; }
  }
  `]
=======
  templateUrl: './profesor-layout.component.html',
  styleUrls: ['./profesor-layout.component.scss']
>>>>>>> Stashed changes
})
export class ProfesorLayoutComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  private auth   = inject(AuthService);
  private dialog = inject(MatDialog);
  private noti   = inject(NotificacionesFacade);

  nav = signal<NavItem[]>([
    { label:'Inicio',             icon:'home',        link:'/profesor' },
    { label:'Fechas de Finales',  icon:'event',       link:'/profesor/fechas-finales' },
    { label:'Listado de Actas',   icon:'assignment',  link:'/profesor/listado-actas' },
    { label:'No Inscriptos',      icon:'person_off',  link:'/profesor/no-inscriptos' },
    { label:'Inscriptos',         icon:'groups',      link:'/profesor/inscriptos' },
    { label:'Correlativas',       icon:'menu_book',   link:'/profesor/correlativas' },
    { label:'Plan Curricular',    icon:'school',      link:'/profesor/plan-curricular' },
    { label:'Cierre de Acta',     icon:'grading',     link:'/profesor/cierre-acta' },
    { label:'Notificaciones',     icon:'notifications', link:'/profesor/notificaciones' }
  ]);

<<<<<<< Updated upstream
  displayName = computed(() => {
    const raw = localStorage.getItem('user') ?? 'profesor1';
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  });
  initials = computed(() => this.displayName().split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase());

  logout(){ this.auth.logout(); }
=======
  displayName = computed(() => (localStorage.getItem('user') ?? 'profesor1')
    .replace(/^./, c => c.toUpperCase()));
  initials = computed(() => this.displayName().split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase());
  unread = this.noti.unreadCount;

  toggleDrawer(){ this.drawer?.toggle(); }
  abrirPerfil() {
    this.dialog.open(PerfilDialogComponent, { panelClass: 'perfil-dialog', autoFocus: false });
  }
  logout() { this.auth.logout(); }
>>>>>>> Stashed changes
}
