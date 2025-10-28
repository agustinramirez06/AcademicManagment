import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PlanCurricularFacade, YearKey, PlanRow } from '../../services/plan-curricular.facade';

@Component({
  standalone: true,
  selector: 'app-plan-curricular',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
  <div class="page">
    <div class="header">
      <h2>Plan Curricular</h2>
      <button mat-flat-button class="export" (click)="exportar()">
        <mat-icon>download</mat-icon>
        Descargar Plan
      </button>
    </div>

    <div class="panel">
      <div class="title-career">Tecnicatura en Programación</div>

      <!-- Pills de año -->
      <div class="tabs">
        <button class="pill" [class.active]="anio() === '1'" (click)="setAnio('1')">1° Año</button>
        <button class="pill" [class.active]="anio() === '2'" (click)="setAnio('2')">2° Año</button>
        <button class="pill" [class.active]="anio() === '3'" (click)="setAnio('3')">3° Año</button>
      </div>

      <div class="table">
        <div class="thead">
          <div>Materia</div>
          <div>Profesor</div>
          <div class="right">Correlativas</div>
        </div>

        <div class="tbody" *ngIf="rows().length; else vacio">
          <div class="tr" *ngFor="let r of rows()">
            <div>{{ r.materia }}</div>
            <div>{{ r.profesor }}</div>
            <div class="right">{{ r.correlativas }}</div>
          </div>
        </div>

        <ng-template #vacio>
          <div class="empty">No hay materias cargadas para este año.</div>
        </ng-template>
      </div>
    </div>
  </div>
  `,
  styles: [`
  :host { display:block; color:var(--app-text); }
    .page { display:flex; flex-direction:column; gap:16px; }
    .header { display:flex; align-items:center; justify-content:space-between; }
    .export { background:var(--accent-red); color:#fff; }

    .panel {
      background:var(--app-surface); border:1px solid var(--app-border);
      border-radius:14px; padding:16px;
    }
    .title-career { color: color-mix(in srgb, var(--accent-red) 70%, var(--app-text) 30%); font-weight:600; margin-bottom:12px; }

    .tabs { display:flex; gap:8px; margin-bottom:8px; }
    .pill {
      background:transparent; color:var(--app-text); border:1px solid var(--app-border);
      padding:6px 12px; border-radius:999px; cursor:pointer;
    }
    .pill.active { background:var(--app-text); color:var(--app-surface); font-weight:700; }

    .table { overflow:hidden; border-radius:10px; }
    .thead, .tr {
      display:grid; align-items:center;
      grid-template-columns: 2fr 2fr 1.2fr;
      gap:10px; padding:12px 14px;
    }
    .thead { color:#9aa3b2; border-bottom:1px solid rgba(255,255,255,.06); }
    .tr { border-bottom:1px solid rgba(255,255,255,.04); }
    .right { text-align:right; }
    .empty { padding:16px; text-align:center; color:#9aa3b2; }

    @media (max-width: 900px) {
      .thead, .tr { grid-template-columns: 2fr 1.5fr; }
      .thead > :last-child, .tr > :last-child { display:none; }
    }
  `]
})
export class PlanCurricularComponent {
  private facade = inject(PlanCurricularFacade);
  anio = signal<YearKey>('1');

  rows = computed<PlanRow[]>(() => this.facade.planPorAnio(this.anio())());

  ngOnInit(){ this.facade.load(); }

  setAnio(y: YearKey){ this.anio.set(y); }

  exportar() {
    const y = this.anio();
    const data = this.facade.getYear(y);
    const headers = ['Materia','Profesor','Correlativas'];
    const lines = [
      `Plan Curricular - Año ${y}°`,
      '',
      headers.join(','),
      ...data.map(r => [q(r.materia), q(r.profesor), q(r.correlativas)].join(','))
    ];
    const csv = '\ufeff' + lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `plan_curricular_${y}.csv`; a.click();
    URL.revokeObjectURL(url);

    function q(v: string){ return `"${(v ?? '').replace(/"/g,'""')}"`; }
  }
}
