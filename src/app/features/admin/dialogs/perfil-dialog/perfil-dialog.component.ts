import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

export type Rol = 'administrador' | 'docente' | 'usuario';

export interface PerfilData {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  activo: boolean;
  telefono?: string;
  empresa?: string;
  avatarUrl?: string;
}

@Component({
  standalone: true,
  selector: 'app-perfil-dialog',
  templateUrl: './perfil-dialog.component.html',
  styleUrls: ['./perfil-dialog.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule
  ]
})
export class PerfilDialogComponent {
  private ref = inject(MatDialogRef<PerfilDialogComponent>);
  data = inject(MAT_DIALOG_DATA) as PerfilData;

  get nombreCompleto(): string {
    return `${this.data.nombre} ${this.data.apellido}`.trim();
  }

  cerrar(): void {
    this.ref.close(null);
  }

  editar(): void {
    this.ref.close({ action: 'edit', id: this.data.id });
  }
}
