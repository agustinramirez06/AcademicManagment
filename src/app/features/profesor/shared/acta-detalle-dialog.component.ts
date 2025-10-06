import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActaDetalle } from '../services/actas.facade';

@Component({
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
  <h2 mat-dialog-title>Acta de Final - {{ data.materia }}</h2>

  <div class="head panel">
    <div class="row">
      <div><b>Materia:</b> {{ data.materia }}</div>
      <div><b>Fecha:</b> {{ data.fecha }}</div>
      <div><b>Hora:</b> {{ data.hora || '-' }}</div>
    </div>
    <div class="row">
      <div><b>Titular:</b> {{ data.titular || '-' }}</div>
      <div><b>Acompañante:</b> {{ data.acompaniante || '-' }}</div>
      <div><b>Inscriptos:</b> {{ data.inscriptos }}</div>
    </div>
  </div>

  <div class="table panel">
    <div class="thead">
      <div>Alumno</div>
      <div>DNI</div>
      <div class="right">Estado</div>
    </div>
    <div class="tbody" *ngIf="data.alumnos?.length; else vacio">
      <div class="tr" *ngFor="let a of data.alumnos">
        <div>{{ a.nombre }}</div>
        <div>{{ a.dni }}</div>
        <div class="right"><span class="badge">{{ a.estado }}</span></div>
      </div>
    </div>
    <ng-template #vacio>
      <div class="empty">No hay alumnos inscriptos.</div>
    </ng-template>
  </div>

  <div class="actions">
    <button mat-stroked-button (click)="close()">Cerrar</button>
    <button mat-flat-button color="primary" (click)="descargar()">Descargar Acta</button>
  </div>
  `,
  styles: [`
    :host { display:block; color:#e5e7eb; background:#0f172a; }
    h2 { margin:0 0 12px; }
    .panel { background:#0b1220; border:1px solid rgba(255,255,255,.08); border-radius:12px; padding:12px; }
    .row { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:8px; margin-bottom:6px; }
    .table { margin-top:10px; }
    .thead, .tr { display:grid; grid-template-columns: 2fr 1fr 1fr; gap:10px; padding:8px; }
    .thead { color:#9aa3b2; border-bottom:1px solid rgba(255,255,255,.06); }
    .tr { border-bottom:1px solid rgba(255,255,255,.04); }
    .right { text-align:right; }
    .badge { background:#7f1d1d; color:#ffdfe0; border-radius:10px; padding:2px 8px; font-size:12px; }
    .empty { padding:12px; color:#9aa3b2; text-align:center; }
    .actions { display:flex; justify-content:flex-end; gap:8px; margin-top:12px; }
  `]
})
export class ActaDetalleDialogComponent {
  data = inject<ActaDetalle>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ActaDetalleDialogComponent>);

  close(){ this.dialogRef.close(); }

  descargar() {
    // Sencillo: descarga del contenido del diálogo como impresión (el visor permite exportar a PDF)
    window.print();
    // Si preferís jsPDF, instala: npm i jspdf  y generamos un PDF real (te paso el snippet si lo querés).
  }
}
