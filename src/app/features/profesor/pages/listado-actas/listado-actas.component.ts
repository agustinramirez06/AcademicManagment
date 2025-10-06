import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActasFacade, ActaResumen, ActaDetalle } from '../../services/actas.facade';
import { ActaDetalleDialogComponent } from '../../shared/acta-detalle-dialog.component';

@Component({
  standalone: true,
  selector: 'app-listado-actas',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  template: `
  <div class="page">
    <div class="header">
      <h2>Listado de Actas</h2>
      <button mat-flat-button class="export" (click)="exportar()">
        <mat-icon>download</mat-icon>
        Exportar PDF
      </button>
    </div>

    <div class="table panel">
      <div class="thead">
        <div>Materia</div>
        <div>Fecha</div>
        <div>Inscriptos</div>
        <div>Estado</div>
        <div class="right">Acciones</div>
      </div>

      <div class="tbody" *ngIf="actas().length; else vacio">
        <div class="tr" *ngFor="let a of actas()">
          <div>{{ a.materia }}</div>
          <div>{{ a.fecha }}</div>
          <div>{{ a.inscriptos }}</div>
          <div><span class="badge">{{ a.estado }}</span></div>
          <div class="right">
            <button mat-stroked-button color="primary" (click)="verActa(a)">Ver Acta</button>
          </div>
        </div>
      </div>

      <ng-template #vacio>
        <div class="empty">No hay actas para mostrar.</div>
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
    .thead, .tr { display:grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap:10px; padding:12px 14px; }
    .thead { color:#9aa3b2; border-bottom:1px solid rgba(255,255,255,.06); }
    .tr { border-bottom:1px solid rgba(255,255,255,.04); align-items:center; }
    .right { text-align:right; }
    .badge { background:#7f1d1d; color:#ffdfe0; border-radius:10px; padding:4px 10px; font-size:12px; }
    .empty { padding:16px; text-align:center; color:#9aa3b2; }
  `]
})
export class ListadoActasComponent {
  private facade = inject(ActasFacade);
  private dialog = inject(MatDialog);

  actas = computed<ActaResumen[]>(() => this.facade.actas());

  ngOnInit(){ this.facade.loadListado(); }

  async verActa(a: ActaResumen) {
    const detalle: ActaDetalle = await this.facade.getDetalle(a.id);
    this.dialog.open(ActaDetalleDialogComponent, {
      data: detalle,
      panelClass: ['dialog-dark']
    });
  }

  exportar() {
    // Solución rápida: imprimir la tabla (el usuario puede Guardar como PDF)
    window.print();
    // Alternativa jsPDF:
    // 1) npm i jspdf
    // 2) import { jsPDF } from 'jspdf';
    // 3) generar PDF con doc.text(...) o autoTable (otra lib).
  }
}
