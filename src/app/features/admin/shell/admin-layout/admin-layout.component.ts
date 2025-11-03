import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// Ajustá la ruta si tu perfil-dialog está en components/ en vez de dialogs/
import { PerfilDialogComponent } from '../../dialogs/perfil-dialog/perfil-dialog.component';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatIconModule, MatMenuModule, MatButtonModule, MatBadgeModule,
    MatSidenavModule, MatListModule, MatDialogModule
  ]
})
export class AdminLayoutComponent implements OnInit {
  @ViewChild('drawer') drawer?: MatSidenav;

  usuario = 'Administrador';
  notificacionesNoLeidas = 0;

  // Mismo patrón que en profesor-layout, pero con rutas de admin
  nav = [
    { label: 'Inicio',         link: '/admin',                 icon: 'home' },
    { label: 'Gestion de Usuarios',       link: '/admin/usuarios',        icon: 'group' },
    { label: 'Gestion de Fechas',          link: '/admin/fechas',           icon: 'shield' },
    { label: 'Reportes',       link: '/admin/reportes',        icon: 'stacked_bar_chart' },
    { label: 'Notificaciones', link: '/admin/notificaciones',  icon: 'notifications' }
  ];

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

	ngOnInit(): void {
	// Soporta distintos estilos de AuthService: función, BehaviorSubject, valor directo
	const cu: any = (this.auth as any).currentUser;
	let u: any = null;

	if (typeof cu === 'function') {
		// Caso: currentUser(): User | null
		u = cu();
	} else if (cu && typeof cu.getValue === 'function') {
		// Caso: BehaviorSubject<User | null>
		u = cu.getValue();
	} else if (cu && 'value' in cu) {
		// Caso: Subject con .value
		u = cu.value;
	} else {
		// Caso: propiedad directa
		u = cu ?? null;
	}

	this.usuario = (u?.displayName ?? u?.name ?? u?.email ?? 'Administrador') as string;

	// Si manejás notificaciones acá:
	// this.notificacionesNoLeidas = this.notifService.unreadCount();
	}

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
      autoFocus: false,
      data: {
        id: 1, nombre: this.displayName(), apellido: '',
        email: 'admin@demo.com', rol: 'administrador', activo: true
      }
    });
  }

  logout(): void { this.cerrarSesion(); }
  cerrarSesion(): void {
    this.auth.logout?.();
    this.router.navigate(['/auth/login']);
  }

  toggleDrawer(): void { this.drawer?.toggle(); }
}
