import { Component, inject, computed } from '@angular/core';
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
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  template: `
  <div class="perfil-container">
    <header class="perfil-header">
      <div class="user">
        <div class="avatar">{{ initials }}</div>
        <div class="info">
          <h2>{{ usuario.nombre }} {{ usuario.apellido }}</h2>
          <span class="role">Profesor</span>
        </div>
      </div>
      <button mat-icon-button mat-dialog-close><mat-icon>close</mat-icon></button>
    </header>

    <mat-tab-group>
      <!-- Información -->
      <mat-tab label="Información">
        <div class="info-section">
          <div class="info-item">
            <mat-icon>email</mat-icon>
            <div>
              <h4>Correo electrónico</h4>
              <p>{{ usuario.email }}</p>
            </div>
          </div>
          <div class="info-item">
            <mat-icon>call</mat-icon>
            <div>
              <h4>Teléfono</h4>
              <p>{{ usuario.telefono }}</p>
            </div>
          </div>
          <div class="info-item">
            <mat-icon>home</mat-icon>
            <div>
              <h4>Dirección</h4>
              <p>{{ usuario.direccion }}</p>
            </div>
          </div>
          <div class="info-item">
            <mat-icon>badge</mat-icon>
            <div>
              <h4>Documento</h4>
              <p>DNI: {{ usuario.dni }}</p>
            </div>
          </div>
        </div>
      </mat-tab>

      <!-- Perfil -->
      <mat-tab label="Perfil">
        <div class="profile-edit">
          <h4>Información editable</h4>
          <mat-form-field appearance="fill">
            <mat-label>Teléfono</mat-label>
            <input matInput [(ngModel)]="usuario.telefono">
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Dirección</mat-label>
            <input matInput [(ngModel)]="usuario.direccion">
          </mat-form-field>

          <button mat-flat-button color="warn" (click)="guardarCambios()">
            <mat-icon>save</mat-icon> Guardar cambios
          </button>
        </div>
      </mat-tab>

      <!-- Configuración -->
      <mat-tab label="Configuración">
        <div class="config">
          <h4>Tema de la aplicación</h4>
          <mat-slide-toggle color="warn"
                            [checked]="isDark()"
                            (change)="toggleTheme($event.checked)">
            Modo oscuro
          </mat-slide-toggle>
          <p class="hint">El modo seleccionado se guarda para tu próxima sesión.</p>
        </div>
      </mat-tab>
    </mat-tab-group>
  </div>
  `,
  styles: [`
    .perfil-container {
      background: var(--panel);
      color: var(--text);
      padding: 1rem;
      border-radius: 14px;
      min-width: 550px;
    }
    .perfil-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      padding-bottom: .5rem;
      margin-bottom: 1rem;
    }
    .user { display: flex; align-items: center; gap: .8rem; }
    .avatar {
      width: 60px; height: 60px;
      border-radius: 50%;
      background: var(--accent);
      display: grid; place-items: center;
      color: #fff; font-weight: bold; font-size: 20px;
    }
    .role {
      background: var(--accent);
      color: #ffdfe0;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
    }
    .info-section {
      display: grid;
      gap: 12px;
      padding: .5rem 0;
    }
    .info-item {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: .75rem;
    }
    .profile-edit {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }
    .config { padding: 1rem 0; }
    .hint { color: var(--muted); font-size: 13px; margin-top: 4px; }
  `]
})
export class PerfilDialogComponent {
  private dialogRef = inject(MatDialogRef<PerfilDialogComponent>);
  private theme = inject(ThemeService);

  usuario = {
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@ist.edu.ar',
    telefono: '011-4444-5555',
    direccion: 'Av. Rivadavia 1000',
    dni: '12345678'
  };

  get initials() {
    return this.usuario.nombre[0] + this.usuario.apellido[0];
  }

  isDark = computed(() => this.theme.theme() === 'dark');
  toggleTheme(checked: boolean) {
    this.theme.setTheme(checked ? 'dark' : 'light');
  }

  guardarCambios() {
    console.log('Guardado:', this.usuario);
    this.dialogRef.close();
  }
}
