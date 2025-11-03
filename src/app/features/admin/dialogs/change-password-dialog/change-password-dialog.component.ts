import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';      // <-- IMPORTANTE
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss'],
  imports: [
    CommonModule, FormsModule,
    MatDialogModule, MatIconModule, // <-- IMPORTANTE
    MatButtonModule, MatFormFieldModule, MatInputModule
  ]
})
export class ChangePasswordDialogComponent {
  private ref = inject(MatDialogRef<ChangePasswordDialogComponent>);
  data = inject(MAT_DIALOG_DATA) as { id: number; name?: string };

  password = '';
  confirm = '';

  get invalid() { return !(this.password.length >= 6 && this.password === this.confirm); }

  guardar() { if (!this.invalid) this.ref.close({ newPassword: this.password }); }
  cerrar() { this.ref.close(null); }
}
