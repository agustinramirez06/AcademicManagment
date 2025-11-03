import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';

// IMPORTS de los diálogos (ajusta las rutas si tu estructura difiere)
import { UserFormDialogComponent } from './dialogs/user-form-dialog/user-form-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { RoleAssignDialogComponent } from './dialogs/role-assign-dialog/role-assign-dialog.component';
import { ActivityDialogComponent } from './dialogs/activity-dialog/activity-dialog.component';
import { ChangePasswordDialogComponent } from './dialogs/change-password-dialog/change-password-dialog.component';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: 'administrador' | 'docente' | 'usuario';
  activo: boolean;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class AdminComponent {
  // Datos de ejemplo; reemplaza por datos reales desde tu servicio
  usuarios: Usuario[] = [
    { id: 1, nombre: 'Ana', apellido: 'García', email: 'ana@demo.com', rol: 'administrador', activo: true },
    { id: 2, nombre: 'Bruno', apellido: 'Pérez', email: 'bruno@demo.com', rol: 'docente', activo: true },
    { id: 3, nombre: 'Carla', apellido: 'Nuñez', email: 'carla@demo.com', rol: 'usuario', activo: false }
  ];

  constructor(private dialog: MatDialog) {}

  crearUsuario(): void {
    this.dialog.open(UserFormDialogComponent, {
      width: '620px',
      data: { mode: 'create' as const }
    }).afterClosed().subscribe((user: Partial<Usuario> | null | undefined) => {
      if (!user) return;
      // Simular alta
      const nuevo: Usuario = {
        id: Math.max(...this.usuarios.map(u => u.id)) + 1,
        nombre: user.nombre ?? '',
        apellido: user.apellido ?? '',
        email: user.email ?? '',
        rol: (user.rol as Usuario['rol']) ?? 'usuario',
        activo: user.activo ?? true
      };
      this.usuarios = [...this.usuarios, nuevo];
      // TODO: llamar a tu servicio para persistir
    });
  }

  editarUsuario(user: Usuario): void {
    this.dialog.open(UserFormDialogComponent, {
      width: '620px',
      data: { mode: 'edit' as const, user }
    }).afterClosed().subscribe((updated: Partial<Usuario> | null | undefined) => {
      if (!updated) return;
      this.usuarios = this.usuarios.map(u =>
        u.id === user.id ? { ...u, ...updated } as Usuario : u
      );
      // TODO: llamar a tu servicio para actualizar
    });
  }

  eliminarUsuario(user: Usuario): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      data: {
        danger: true,
        title: 'Eliminar usuario',
        message: `¿Eliminar a ${user.nombre} ${user.apellido}?`,
        okLabel: 'Eliminar'
      }
    }).afterClosed().subscribe((ok: boolean | undefined) => {
      if (!ok) return;
      this.usuarios = this.usuarios.filter(u => u.id !== user.id);
      // TODO: llamar a tu servicio para eliminar
    });
  }

  asignarRol(user: Usuario): void {
    this.dialog.open(RoleAssignDialogComponent, {
      width: '420px',
      data: { id: user.id, name: `${user.nombre} ${user.apellido}`, currentRole: user.rol }
    }).afterClosed().subscribe((role: Usuario['rol'] | null | undefined) => {
      if (!role) return;
      this.usuarios = this.usuarios.map(u =>
        u.id === user.id ? { ...u, rol: role } : u
      );
      // TODO: actualizar rol en backend
    });
  }

  verActividad(user: Usuario): void {
    const logs = [
      { action: `Ingreso al sistema (${user.email})`, when: '2025-10-29 10:12' },
      { action: 'Editó perfil', when: '2025-10-29 10:15' }
    ];
    this.dialog.open(ActivityDialogComponent, {
      width: '560px',
      data: { logs }
    });
  }

  cambiarPassword(user: Usuario): void {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '520px',
      data: { id: user.id, name: `${user.nombre} ${user.apellido}` }
    }).afterClosed().subscribe((res: { newPassword: string } | null | undefined) => {
      if (!res?.newPassword) return;
      // TODO: enviar al backend para actualizar contraseña de user.id
      console.log('Actualizar contraseña de', user.id, 'a', res.newPassword);
    });
  }
}
