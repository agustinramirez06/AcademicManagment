import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FinalItem, FinalesFacade } from '../services/finales.facade';

@Component({
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatDialogModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule
  ],
  template: `
  <h2 mat-dialog-title>Solicitar Cambio - {{ data.materia }}</h2>

  <div class="info">
    <div><b>Fecha:</b> {{ data.fecha }}</div>
    <div><b>Hora:</b> {{ data.hora }}</div>
    <div><b>Titular:</b> {{ data.titular }}</div>
    <div *ngIf="data.acompaniante"><b>Acompañante:</b> {{ data.acompaniante }}</div>
  </div>

  <div class="form">
    <mat-form-field appearance="fill" class="field">
      <mat-label>Tipo de cambio solicitado</mat-label>
      <mat-select [(ngModel)]="tipo">
        <mat-option value="fecha-hora">Modificar fecha / hora</mat-option>
        <mat-option value="acompaniante">Modificar acompañante</mat-option>
        <mat-option value="cancelacion">Cancelar mesa</mat-option>
        <mat-option value="otro">Otro</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field appearance="fill" class="field">
      <mat-label>Motivo de la solicitud</mat-label>
      <textarea matInput rows="4" [(ngModel)]="motivo" placeholder="Explique el motivo..."></textarea>
    </mat-form-field>
  </div>

  <div class="actions">
    <button mat-stroked-button (click)="close()">Cancelar</button>
    <button mat-flat-button color="primary" (click)="enviar()" [disabled]="!tipo || !motivo.trim()">
      Enviar Solicitud
    </button>
  </div>
  `,
  styles: [`
    :host { display:block; padding:8px 12px 16px; background:var(--app-surface); color:var(--app-text); }
    h2 { margin:0 0 12px; }
    .info { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:8px; background:transparent; padding:10px; border-radius:10px; margin-bottom:12px; border:1px solid var(--app-border); }
    .form .field { width:100%; }
    .actions { display:flex; justify-content:flex-end; gap:8px; }
  `]
})
export class SolicitarCambioDialogComponent {
  data: FinalItem = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<SolicitarCambioDialogComponent>);
  facade = inject(FinalesFacade);

  tipo: 'fecha-hora' | 'acompaniante' | 'cancelacion' | 'otro' | '' = '' as any;
  motivo = '';

  close(){ this.dialogRef.close(); }
  enviar(){
    this.facade.solicitarCambio({
      finalId: this.data.id,
      tipo: this.tipo as any,
      motivo: this.motivo.trim()
    });
    this.dialogRef.close(true);
  }
}
