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
  :host { display:block; color: var(--app-text); }
    .page { display:flex; flex-direction:column; gap:14px; }
    /* Header: allow wrapping on small screens so actions don't overlap */
    .header { display:flex; align-items:center; justify-content:space-between; gap:18px; flex-wrap:wrap; }
    .header h2 { font-size:1.5rem; font-weight:700; margin:0; color:var(--app-text); }
    .actions { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
    .selector { min-width:180px; }
    .export { background:var(--accent-red); color:#fff; font-weight:600; }
    .table.panel { background:var(--app-surface); border-radius:12px; box-shadow:var(--app-shadow); padding:0; overflow-x:auto; min-width:600px; }
    .thead, .tbody, .tr { display:grid; grid-template-columns:2fr 2fr 2fr 1fr 2fr; align-items:center; }
    .thead { font-weight:600; color:var(--app-muted); border-bottom:1px solid var(--app-border); background:var(--app-bg); }
    .tr { border-bottom:1px solid var(--app-border); }
    .badge { background:var(--accent-red); color:#fff; border-radius:8px; padding:2px 10px; font-size:0.95em; font-weight:500; }
    .right { text-align:right; }
    .empty { padding:24px; text-align:center; color:var(--app-muted); }
    @media (max-width:900px) {
      .header { flex-direction:column; align-items:flex-start; gap:10px; }
      .actions { width:100%; justify-content:flex-start; }
      .table.panel { box-shadow:none; border-radius:0; min-width:100vw; }
      .thead, .tbody, .tr { grid-template-columns:1.5fr 1.5fr 1.5fr 1fr 1.5fr; font-size:0.95em; }
    }
    @media (max-width:600px) {
      .header { flex-direction:column; gap:8px; }
      .actions { flex-direction:column; gap:8px; width:100%; }
      .table.panel { padding:0; min-width:100vw; }
      .thead, .tbody, .tr { grid-template-columns:1fr 1fr 1fr 1fr 1fr; font-size:0.92em; }
      .badge { font-size:0.9em; padding:2px 6px; }
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
