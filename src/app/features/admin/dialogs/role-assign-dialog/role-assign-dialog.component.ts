import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'app-role-assign-dialog',
  imports: [
    CommonModule, FormsModule,
    MatDialogModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatSelectModule
  ],
  templateUrl: './role-assign-dialog.component.html',
  styleUrls: ['./role-assign-dialog.component.scss']
})
export class RoleAssignDialogComponent {
  private ref = inject(MatDialogRef<RoleAssignDialogComponent>);
  data = inject(MAT_DIALOG_DATA) as { id: number; name?: string; currentRole?: string };

  role = this.data?.currentRole || 'usuario';

  guardar() { this.ref.close(this.role); }
  cerrar() { this.ref.close(null); }
}
