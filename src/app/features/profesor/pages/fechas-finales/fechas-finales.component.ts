import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FinalesFacade, FinalItem } from '../../services/finales.facade';
import { SolicitarCambioDialogComponent } from '../../shared/solicitar-cambio-dialog.component';

@Component({
  standalone: true,
  selector: 'app-fechas-finales',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule],
  template: `
  <div class="page">
    <div class="header-row">
      <h2>Fechas de Finales</h2>
      <span class="muted">Solo visualización. Para cambios, solicite al administrativo.</span>
    </div>

    <div class="list">
      <div class="card" *ngFor="let f of finales()">
        <div class="card-head">
          <span class="career chip-outline">{{ f.carrera }}</span>
          <span class="state chip">{{ f.estado }}</span>

          <button mat-icon-button class="ghost" matTooltip="Solicitar cambio" (click)="openCambio(f)">
            <mat-icon>chat_bubble_outline</mat-icon>
          </button>
        </div>

        <div class="title">{{ f.materia }}</div>

        <div class="row">
          <div class="item">
            <mat-icon>event</mat-icon>
            <span>{{ f.fecha }} - {{ f.hora }}</span>
          </div>

          <div class="item">
            <mat-icon>groups</mat-icon>
            <span>{{ f.inscriptos }} alumnos inscriptos</span>
          </div>
        </div>

        <div class="row">
          <div class="item">
            <mat-icon>person</mat-icon>
            <span>Titular: {{ f.titular }}</span>
          </div>

          <div class="item" *ngIf="f.acompaniante">
            <mat-icon>person_outline</mat-icon>
            <span>Acompañante: {{ f.acompaniante }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    :host { display:block; color:#e5e7eb; }
    .page { display:flex; flex-direction:column; gap:14px; }
    .header-row { display:flex; align-items:center; justify-content:space-between; }
    .muted { color:#9aa3b2; font-size:14px; }

    .list { display:flex; flex-direction:column; gap:14px; }
    .card {
      background:#0f172a;
      border:1px solid rgba(255,255,255,.08);
      border-radius:14px;
      padding:14px 16px;
      box-shadow:0 10px 30px rgba(0,0,0,.25);
    }
    .card-head {
      display:flex; align-items:center; gap:8px;
      justify-content:space-between; margin-bottom:10px;
    }
    .title { font-size:20px; font-weight:700; margin-bottom:10px; }

    .row { display:flex; align-items:center; gap:20px; margin:8px 0; flex-wrap:wrap; }
    .item { display:flex; align-items:center; gap:8px; color:#cbd5e1; }
    .item mat-icon { font-size:20px; height:20px; width:20px; }

    .chip { background:#7f1d1d; color:#ffdee0; border-radius:10px; padding:4px 10px; font-size:12px; }
    .chip-outline { color:#fca5a5; border:1px solid rgba(252,165,165,.45); border-radius:10px; padding:4px 10px; font-size:12px; background:transparent; }

    .ghost { margin-left:auto; color:#cbd5e1; }
    .ghost:hover { background:rgba(255,255,255,.08); }
  `]
})
export class FechasFinalesComponent {
  private facade = inject(FinalesFacade);
  private dialog = inject(MatDialog);

  finales = computed<FinalItem[]>(() => this.facade.finales());

  ngOnInit(){ this.facade.load(); }

  openCambio(f: FinalItem){
    this.dialog.open(SolicitarCambioDialogComponent, {
      data: f,
      panelClass: ['dialog-dark'],
    }).afterClosed().subscribe(ok => {
      if (ok) {
        // feedback rápido (opcional)
        console.log('Solicitud enviada');
      }
    });
  }
}
