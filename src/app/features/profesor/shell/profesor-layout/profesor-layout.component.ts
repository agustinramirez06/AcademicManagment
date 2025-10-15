import { Component, ViewChild, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AuthService } from '../../../../services/auth.service';
import { NotificacionesFacade } from '../../services/notificaciones.facade';
import { PerfilDialogComponent } from '../../components/perfil-dialog/perfil-dialog.component';

type NavItem = { label: string; icon: string; link: string };

@Component({
  standalone: true,
  selector: 'app-profesor-layout',
  imports: [
    CommonModule,
    RouterOutlet, RouterLink, RouterLinkActive,
    MatIconModule, MatMenuModule, MatButtonModule, MatBadgeModule,
    MatSidenavModule, MatListModule, MatDialogModule
    // , PerfilDialogComponent  // descomenta si lo usas
  ],
  templateUrl: './profesor-layout.component.html',
  styleUrls: ['./profesor-layout.component.scss'],
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
  ]);

  displayName = computed(() => (localStorage.getItem('user') ?? 'profesor1')
    .replace(/^./, c => c.toUpperCase()));
  initials = computed(() => this.displayName().split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase());

  unread = this.noti.unreadCount;

  toggleDrawer(){ this.drawer?.toggle(); }

  // dentro de class ProfesorLayoutComponent
  async abrirPerfil() {
    // import dinámico: evita problemas de rutas/compilación
    const { PerfilDialogComponent } = await import(
      '../../components/perfil-dialog/perfil-dialog.component'
    );
    this.dialog.open(PerfilDialogComponent, {
      panelClass: 'perfil-dialog',
      autoFocus: false,
      width: '760px',
    });
  }

  logout(){ this.auth.logout(); }
}
