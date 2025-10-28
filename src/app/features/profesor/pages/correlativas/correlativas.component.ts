import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CorrelativasFacade, CorrelativaRow } from '../../services/correlativas.facade';

@Component({
  standalone: true,
  selector: 'app-correlativas',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
  <div class="page">
    <div class="header">
      <h2>Listado de Correlativas</h2>
      <button mat-flat-button class="export" (click)="exportar()">
        <mat-icon>download</mat-icon>
        Descargar Listado
      </button>
    </div>

    <div class="table panel">
      <div class="thead">
        <div>Materia</div>
        <div>Materia Correlativa</div>
        <div class="right">Año</div>
      </div>

      <div class="tbody" *ngIf="rows().length; else vacio">
        <div class="tr" *ngFor="let r of rows()">
          <div>{{ r.materia }}</div>
          <div>{{ r.materiaCorrelativa }}</div>
          <div class="right">{{ r.anio }}</div>
        </div>
      </div>

      <ng-template #vacio>
        <div class="empty">No hay correlativas para mostrar.</div>
      </ng-template>
    </div>
  </div>
  `,
  styles: [`
  :host { display:block; color:var(--app-text); }
    .page { display:flex; flex-direction:column; gap:14px; }
    .header { display:flex; align-items:center; justify-content:space-between; }
  .export { background:var(--accent-red); color:#fff; }

  .panel { background:var(--app-surface); border:1px solid var(--app-border); border-radius:12px; }
    .table { overflow:hidden; }
    .thead, .tr {
      display:grid; align-items:center;
      grid-template-columns: 2fr 2fr 0.6fr;
      gap:10px; padding:12px 14px;
    }
  .thead { color:var(--app-muted); border-bottom:1px solid var(--app-border); }
  .tr    { border-bottom:1px solid var(--app-border); }
    .right { text-align:right; }
  .empty { padding:16px; text-align:center; color:var(--app-muted); }

    @media (max-width: 820px) {
      .thead, .tr { grid-template-columns: 2fr 1.2fr; }
      .thead > :last-child, .tr > :last-child { display:none; }
    }
  `]
})
export class CorrelativasComponent {
  private facade = inject(CorrelativasFacade);
  rows = computed<CorrelativaRow[]>(() => this.facade.rows());

  ngOnInit(){ this.facade.load(); }

  exportar() {
    const data: CorrelativaRow[] = this.rows();
    const headers = ['Materia','Materia Correlativa','Año'];
    const lines: string[] = [
      headers.join(','),
      ...data.map(r => [q(r.materia), q(r.materiaCorrelativa), q(r.anio)].join(','))
    ];
    const csv = '\ufeff' + lines.join('\n'); // BOM para Excel
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'correlativas.csv'; a.click();
    URL.revokeObjectURL(url);

    function q(v: string){ return `"${(v ?? '').replace(/"/g,'""')}"`; }
  }
}
