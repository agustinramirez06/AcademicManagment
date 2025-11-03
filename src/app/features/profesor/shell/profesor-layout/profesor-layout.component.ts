import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../../shared/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PerfilDialogComponent } from '../../components/perfil-dialog/perfil-dialog.component';

// Angular Material (header + sidenav + menu + iconos + badge + lista + botones)
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-profesor-layout',
  templateUrl: './profesor-layout.component.html',
  styleUrls: ['./profesor-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    // Angular
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    // Material
    MatIconModule, MatMenuModule, MatButtonModule, MatBadgeModule,
    MatSidenavModule, MatListModule, MatDialogModule
  ]
})
export class ProfesorLayoutComponent implements OnInit {
  @ViewChild('drawer') drawer?: MatSidenav;

  usuario: string = 'Profesor';
  notificacionesNoLeidas = 0; // si ya tenés un servicio que la actualiza, asignalo en ngOnInit

  nav = [
    { label: 'Inicio',              link: '/profesor',                    icon: 'home' },
    { label: 'Fechas de Finales',   link: '/profesor/fechas-finales',     icon: 'event' },
    { label: 'Listado de Actas',    link: '/profesor/listado-actas',      icon: 'description' },
    { label: 'No Inscriptos',       link: '/profesor/no-inscriptos',      icon: 'person_off' },
    { label: 'Inscriptos',          link: '/profesor/inscriptos', icon: 'groups' },
    { label: 'Correlativas',        link: '/profesor/correlativas',       icon: 'menu_book' },
    { label: 'Plan Curricular',     link: '/profesor/plan-curricular',    icon: 'school' },
    { label: 'Cierre de Acta',      link: '/profesor/cierre-acta',        icon: 'assignment' },
    { label: 'Notificaciones',      link: '/profesor/notificaciones',     icon: 'notifications' }
  ];

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener usuario desde AuthService (mantener en sync al recargar)
    const u = this.auth.currentUser();
    this.usuario = u?.displayName ?? u?.id ?? 'Profesor';

    // Si más adelante querés conectar el badge a tu servicio de notificaciones, actualizá notificacionesNoLeidas acá:
    // this.notificacionesNoLeidas = ...
  }

  // Helpers usados en el template
  unread(): number { return this.notificacionesNoLeidas || 0; }
  displayName(): string { return this.usuario; }
  initials(): string {
    return this.displayName().split(' ').map(p => p[0] ?? '').join('').slice(0,2).toUpperCase();
  }

  abrirPerfil(): void {
    this.dialog.open(PerfilDialogComponent, {
      width: '720px',
      maxWidth: '95vw',
      panelClass: 'perfil-dialog',
      autoFocus: false
    });
  }

  // alias para que el template compile si tenías (click)="logout()"
  logout(): void { this.cerrarSesion(); }

  cerrarSesion(): void {
    this.auth.logout();
    // redirigir al login central
    this.router.navigate(['/auth/login']);
  }

  toggleDrawer(): void {
    this.drawer?.toggle();
  }
}
