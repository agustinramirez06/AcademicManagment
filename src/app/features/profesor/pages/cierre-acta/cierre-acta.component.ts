import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type Alumno = { id: number; nombre: string; estado: string; };
type Mesa = { id: number; materia: string; fecha: string; alumnos: Alumno[]; };

@Component({
  standalone: true,
  selector: 'app-cierre-acta',
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
  template: `
  <div class="page">
    <h2>Cierre de Acta (Carga de Notas)</h2>

    <div class="mesa panel" *ngFor="let mesa of mesas()">
      <div class="mesa-header">
        <mat-icon>event_note</mat-icon>
        <span>{{ mesa.materia }} - {{ mesa.fecha }}</span>
      </div>

      <div class="thead">
        <div>Alumno</div>
        <div>Estado</div>
        <div>Nota</div>
        <div class="right">Acciones</div>
      </div>

      <div class="tbody" *ngIf="mesa.alumnos.length; else vacio">
        <div class="tr" *ngFor="let a of mesa.alumnos">
          <div>{{ a.nombre }}</div>
          <div>
            <span class="badge" [class.inscripto]="a.estado === 'inscripto'">{{ a.estado }}</span>
          </div>
          <div>
            <input matInput class="nota"
                placeholder="Nota"
                type="number" min="1" max="10"
                [ngModel]="notaDe(mesa.id, a.id) ?? ''"
                (ngModelChange)="onNotaChange(mesa.id, a.id, $event)"/>

          </div>
          <div class="right">
            <button mat-flat-button color="warn"
                    [disabled]="!puedeGuardar(mesa.id,a.id)"
                    (click)="guardar(mesa.id,a.id)">
              <mat-icon>save</mat-icon> Guardar
            </button>
          </div>
        </div>
      </div>

      <ng-template #vacio>
        <div class="empty">No hay alumnos en esta mesa.</div>
      </ng-template>
    </div>
  </div>
  `,
  styles: [`
    :host { display:block; color:#e5e7eb; }
    .page { display:flex; flex-direction:column; gap:16px; }
    h2 { margin:0; }
    .panel {
      background:#0f172a;
      border:1px solid rgba(255,255,255,.08);
      border-radius:12px;
      padding:10px 0;
    }
    .mesa-header {
      display:flex; align-items:center; gap:8px;
      font-weight:600; font-size:16px;
      padding:10px 16px;
      border-bottom:1px solid rgba(255,255,255,.06);
      color:#fca5a5;
    }

    .thead, .tr {
      display:grid;
      grid-template-columns: 2fr 1fr 1fr 1.3fr;
      align-items:center;
      gap:8px;
      padding:10px 16px;
    }
    .thead { color:#9aa3b2; font-weight:500; border-bottom:1px solid rgba(255,255,255,.06); }
    .tr { border-bottom:1px solid rgba(255,255,255,.04); }

    .badge {
      padding:4px 10px; border-radius:999px; font-size:12px;
      background:#334155; color:#e2e8f0;
    }
    .badge.inscripto {
      background:#7f1d1d; color:#ffdee0;
    }

    .nota {
      width:80px;
      padding:4px 8px;
      border-radius:8px;
      border:1px solid rgba(255,255,255,.1);
      background:#1e293b; color:#fff;
      text-align:center;
    }
    .nota:focus { outline:none; border-color:#f43f5e; }

    .right { text-align:right; }

    button[mat-flat-button] {
      background:#7f1d1d;
      color:#ffdee0;
      transition:background .2s ease;
    }
    button[mat-flat-button]:hover:not(:disabled) { background:#991b1b; }
    button[mat-flat-button]:disabled { opacity:.4; cursor:not-allowed; }

    .empty { text-align:center; padding:16px; color:#9aa3b2; }

    @media (max-width: 900px) {
      .thead, .tr { grid-template-columns: 2fr 0.8fr 0.8fr; }
      .right { display:none; }
    }
  `]
})
export class CierreActaComponent {
  // -----------------------------
  // Mock de datos
  // -----------------------------
  mesas = signal<Mesa[]>([
    {
      id: 1,
      materia: 'Programación I',
      fecha: '2024-02-15',
      alumnos: [
        { id: 1, nombre: 'Carlos Rodríguez', estado: 'inscripto' },
        { id: 2, nombre: 'Ana López', estado: 'inscripto' }
      ]
    },
    {
      id: 2,
      materia: 'Programación II',
      fecha: '2024-03-01',
      alumnos: []
    }
  ]);

  // -----------------------------
  // Estado local (notas)
  // -----------------------------
  notas = signal<Record<string, number | undefined>>({});

  key(mesaId: number, alumnoId: number): string {
    return `${mesaId}_${alumnoId}`;
  }

  notaDe(mesaId: number, alumnoId: number): number | undefined {
    const k = this.key(mesaId, alumnoId);
    return this.notas()[k];
  }

  onNotaChange(mesaId: number, alumnoId: number, val: any) {
    const k = this.key(mesaId, alumnoId);
    let n = Number(val);
    if (Number.isNaN(n)) {
      this.notas.update(m => ({ ...m, [k]: undefined }));   // ← undefined, no null
      return;
    }
    if (n < 1) n = 1;
    if (n > 10) n = 10;
    this.notas.update(m => ({ ...m, [k]: n }));
  }

  puedeGuardar(mesaId: number, alumnoId: number): boolean {
    const v = this.notaDe(mesaId, alumnoId);
    return typeof v === 'number' && v >= 1 && v <= 10;
  }


  guardar(mesaId: number, alumnoId: number) {
    const nota = this.notaDe(mesaId, alumnoId);
    if (typeof nota !== 'number') return; 
  }
}
