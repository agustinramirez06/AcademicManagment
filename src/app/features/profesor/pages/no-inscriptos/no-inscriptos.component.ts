import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlumnosFacade, NoIncriptoItem } from '../../services/alumnos.facade';

@Component({
  standalone: true,
  selector: 'app-no-inscriptos',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
  <div class="page">
    <div class="header">
      <h2>Alumnos en Condición de Rendir (No Inscriptos)</h2>
      <button mat-flat-button class="export" (click)="exportar()">
        <mat-icon>download</mat-icon>
        Exportar
      </button>
    </div>

    <div class="table panel">
      <div class="thead">
        <div>Carrera</div>
        <div>Alumno</div>
        <div>DNI</div>
        <div>Materia</div>
        <div>Email</div>
        <div class="right">Teléfono</div>
      </div>

      <div class="tbody" *ngIf="rows().length; else vacio">
        <div class="tr" *ngFor="let r of rows()">
          <div>
            <span class="chip-outline">{{ r.carrera }}</span>
          </div>
          <div>{{ r.alumno }}</div>
          <div>{{ r.dni }}</div>
          <div>{{ r.materia }}</div>
          <div class="ellipsis">{{ r.email }}</div>
          <div class="right">{{ r.telefono }}</div>
        </div>
      </div>

      <ng-template #vacio>
        <div class="empty">No hay alumnos para mostrar.</div>
      </ng-template>
    </div>
  </div>
  `,
  styles: [`
    :host { display:block; color:#e5e7eb; }
    .page { display:flex; flex-direction:column; gap:14px; }
    .header { display:flex; align-items:center; justify-content:space-between; }
    .export { background:#7f1d1d; color:#ffdee0; }

    .panel { background:#0f172a; border:1px solid rgba(255,255,255,.08); border-radius:12px; }
    .table { overflow:hidden; }

    .thead, .tr {
      display:grid; align-items:center;
      grid-template-columns: 2fr 2fr 1fr 2fr 2fr 1fr;
      gap:10px; padding:12px 14px;
    }
    .thead { color:#9aa3b2; border-bottom:1px solid rgba(255,255,255,.06); }
    .tr { border-bottom:1px solid rgba(255,255,255,.04); }
    .right { text-align:right; }
    .empty { padding:16px; text-align:center; color:#9aa3b2; }

    .chip-outline {
      display:inline-block; font-size:12px; padding:4px 10px; border-radius:10px;
      color:#fca5a5; border:1px solid rgba(252,165,165,.45); background:transparent;
    }

    .ellipsis { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

    @media (max-width: 1100px) {
      .thead, .tr { grid-template-columns: 2fr 2fr 1fr 2fr 2fr; }
      .right { text-align:left; }
      .thead > :last-child, .tr > :last-child { display:none; } /* oculta teléfono en pantallas medianas */
    }
    @media (max-width: 800px) {
      .thead, .tr { grid-template-columns: 2fr 1fr 2fr; }
      .thead > :nth-child(3), .tr > :nth-child(3),
      .thead > :nth-child(5), .tr > :nth-child(5) { display:none; } /* oculta DNI y Email */
    }
  `]
})
export class NoInscriptosComponent {
  private facade = inject(AlumnosFacade);

  rows = computed<NoIncriptoItem[]>(() => this.facade.noInscriptos());

  ngOnInit(){ this.facade.loadNoInscriptos(); }

  exportar() {
    // CSV simple
    const data = this.rows();
    const headers = ['Carrera','Alumno','DNI','Materia','Email','Telefono'];
    const lines = [
      headers.join(','),
      ...data.map(r => [
        quote(r.carrera), quote(r.alumno), quote(r.dni),
        quote(r.materia), quote(r.email), quote(r.telefono)
      ].join(','))
    ];
    const csv = '\ufeff' + lines.join('\n'); // BOM para Excel
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'alumnos_no_inscriptos.csv'; a.click();
    URL.revokeObjectURL(url);

    function quote(v: string){ return `"${(v ?? '').replace(/"/g, '""')}"`; }
  }
}
