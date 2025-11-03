import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface UserData {
  id?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  rol?: 'administrador' | 'docente' | 'usuario';
  activo?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-user-form-dialog',
  imports: [
    CommonModule, FormsModule,
    MatDialogModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule
  ],
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {
  private ref = inject(MatDialogRef<UserFormDialogComponent>);
  data = inject(MAT_DIALOG_DATA) as { mode: 'create' | 'edit'; user?: UserData };

  user: UserData = { ...(this.data?.user || {}), activo: this.data?.user?.activo ?? true };
  title = this.data?.mode === 'create' ? 'Crear usuario' : 'Editar usuario';

  guardar() { this.ref.close(this.user); }
  cerrar() { this.ref.close(null); }
}
