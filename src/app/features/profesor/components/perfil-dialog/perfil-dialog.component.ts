import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  standalone: true,
  selector: 'app-perfil-dialog',
  imports: [
    CommonModule, FormsModule,
    MatDialogModule, MatTabsModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSlideToggleModule
  ],
  templateUrl: './perfil-dialog.component.html',
  styleUrls: ['./perfil-dialog.component.scss']
})
export class PerfilDialogComponent {
  private dialogRef = inject(MatDialogRef<PerfilDialogComponent>);
  public theme = inject(ThemeService);

  user = {
    nombre: 'Juan', apellido: 'Pérez',
    email: 'juan.perez@ist.edu.ar',
    telefono: '011-4444-5555',
    direccion: 'Av. Rivadavia 1000',
    dni: '12345678'
  };

  isDark = computed(() => this.theme.currentTheme() === 'dark');

  toggleTheme(checked: boolean) {
    this.theme.applyTheme(checked ? 'dark' : 'light');
  }

  get initials() {
    return (this.user.nombre[0] + this.user.apellido[0]).toUpperCase();
  }

  close() { this.dialogRef.close(); }
}
