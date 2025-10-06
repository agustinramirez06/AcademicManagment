import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { InscriptosFacade, IncriptoItem } from '../../services/inscriptos.facade';

@Component({
  standalone: true,
  selector: 'app-inscriptos',
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule],
  template: `
  <div class="page">
    <div class="header">
      <h2>Alumnos Inscriptos</h2>

      <div class="actions">
        <mat-select [(ngModel)]="materiaSeleccionada" class="selector" disableOptionCentering>
          <mat-option [value]="''">Todas las materias</mat-option>
          <mat-option *ngFor="let m of materias()" [value]="m">{{ m }}</mat-option>
        </mat-select>

        <button mat-flat-button class="export" (click)="exportar()">
          <mat-icon>download</mat-icon>
          Exportar
        </button>
      </div>
    </div>

    <div class="table panel">
      <div class="thead">
        <div>Alumno</div>
        <div>Materia</div>
        <div>Fecha Final</div>
        <div>Estado</div>
        <div class="right">Fecha Inscripción</div>
      </div>

      <div class="tbody" *ngIf="rowsFiltrados().length; else vacio">
        <div class="tr" *ngFor="let r of rowsFiltrados()">
          <div>{{ r.alumno }}</div>
          <div>{{ r.materia }}</div>
          <div>{{ r.fechaFinal }}</div>
          <div><span class="badge">{{ r.estado }}</span></div>
          <div class="right">{{ r.fechaInscripcion }}</div>
        </div>
      </div>

      <ng-template #vacio>
        <div class="empty">No hay inscriptos para mostrar.</div>
      </ng-template>
    </div>
  </div>
  `,
  styles: [`
    :host { display:block; color:#e5e7eb; }
    .page { display:flex; flex-direction:column; gap:14px; }
    .header { display:flex; align-items:center; justify-content:space-between; gap:12px; }
    .actions { display:flex; align-items:center; gap:10px; }
    .selector { min-width: 220px; background:#0f172a; border-radius:8px; padding:0 6px; }
    .export { background:#7f1d1d; color:#ffdee0; }

    .panel { background:#0f172a; border:1px solid rgba(255,255,255,.08); border-radius:12px; }
    .table { overflow:hidden; }
    .thead, .tr {
      display:grid; align-items:center;
      grid-template-columns: 2fr 2fr 1.2fr 1fr 1.2fr;
      gap:10px; padding:12px 14px;
    }
    .thead { color:#9aa3b2; border-bottom:1px solid rgba(255,255,255,.06); }
    .tr { border-bottom:1px solid rgba(255,255,255,.04); }

    .badge { background:#7f1d1d; color:#ffdfe0; border-radius:10px; padding:4px 10px; font-size:12px; }
    .right { text-align:right; }
    .empty { padding:16px; text-align:center; color:#9aa3b2; }

    @media (max-width: 980px) {
      .thead, .tr { grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr; }
    }
    @media (max-width: 760px) {
      .thead, .tr { grid-template-columns: 2fr 1fr 1fr; }
      .thead > :nth-child(3), .tr > :nth-child(3),
      .thead > :nth-child(5), .tr > :nth-child(5) { display:none; } /* oculta fechas en móvil */
    }
  `]
})
export class InscriptosComponent {
  private facade = inject(InscriptosFacade);

  materiaSeleccionada = signal<string>(''); // '' = todas
  materias = this.facade.materias;

  rowsFiltrados = computed<IncriptoItem[]>(() => {
    const all = this.facade.rows();
    const m = this.materiaSeleccionada().trim();
    return m ? all.filter(r => r.materia === m) : all;
  });

  ngOnInit(){ this.facade.load(); }

  exportar() {
    const data: IncriptoItem[] = this.rowsFiltrados();
    const headers = ['Alumno','Materia','Fecha Final','Estado','Fecha Inscripción'];
    const lines: string[] = [
      headers.join(','),
      ...data.map(r => [
        q(r.alumno), q(r.materia), q(r.fechaFinal),
        q(r.estado), q(r.fechaInscripcion)
      ].join(','))
    ];
    const csv = '\ufeff' + lines.join('\n'); // BOM para Excel
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'alumnos_inscriptos.csv'; a.click();
    URL.revokeObjectURL(url);

    function q(v: string){ return `"${(v ?? '').replace(/"/g,'""')}"`; }
  }
}
