import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificacionesFacade, Notificacion } from '../../services/notificaciones.facade';

type Tab = 'unread' | 'read' | 'all';

@Component({
  standalone: true,
  selector: 'app-notificaciones',
  imports: [CommonModule, DatePipe, MatButtonModule, MatIconModule],
  template: `
  <div class="page">
    <h2>Notificaciones</h2>

    <!-- métricas -->
    <div class="metrics">
      <div class="metric">
        <div class="big">{{ total() }}</div>
        <div class="muted">Total</div>
        <mat-icon>notifications</mat-icon>
      </div>

      <div class="metric">
        <div class="big">{{ unreadCount() }}</div>
        <div class="muted">No leídas</div>
        <mat-icon class="warn">priority_high</mat-icon>
      </div>

      <div class="metric">
        <div class="big">{{ readCount() }}</div>
        <div class="muted">Leídas</div>
        <mat-icon class="ok">check</mat-icon>
      </div>

      <div class="spacer"></div>

      <button mat-stroked-button (click)="markAll()" [disabled]="!unreadCount()">
        <mat-icon>done_all</mat-icon>
        Marcar todas como leídas
        <span class="mini" *ngIf="unreadCount()">({{ unreadCount() }} no leídas)</span>
      </button>
    </div>

    <!-- tabs -->
    <div class="tabs">
      <button class="pill" [class.active]="tab() === 'unread'" (click)="tab.set('unread')">
        No leídas <span class="badge-num" *ngIf="unreadCount()">{{ unreadCount() }}</span>
      </button>
      <button class="pill" [class.active]="tab() === 'read'" (click)="tab.set('read')">Leídas</button>
      <button class="pill" [class.active]="tab() === 'all'" (click)="tab.set('all')">Todas</button>
    </div>

    <!-- lista -->
    <div class="list">
      <div class="card" *ngFor="let n of filtered()">
        <div class="header">
          <div class="left">
            <mat-icon class="info" *ngIf="n.nivel === 'info'">info</mat-icon>
            <mat-icon class="warn" *ngIf="n.nivel === 'warning'">warning</mat-icon>
            <mat-icon class="ok"   *ngIf="n.nivel === 'success'">check_circle</mat-icon>
            <mat-icon class="err"  *ngIf="n.nivel === 'error'">error</mat-icon>

            <div class="title">{{ n.titulo }}</div>
            <span class="chip" [class.i]="n.nivel==='info'" [class.w]="n.nivel==='warning'"
                  [class.s]="n.nivel==='success'" [class.e]="n.nivel==='error'">
              {{ n.nivel }}
            </span>
            <span class="dot" *ngIf="!n.leida"></span>
          </div>

          <div class="actions">
            <button mat-stroked-button (click)="markOne(n)" [disabled]="n.leida">
              <mat-icon>done</mat-icon>
              Marcar como leída
            </button>
            <button mat-icon-button (click)="remove(n)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>

        <div class="body">{{ n.detalle }}</div>
        <div class="foot">{{ n.fechaIso | date:'dd/MM/yyyy, HH:mm' }}</div>
      </div>

      <div class="empty" *ngIf="!filtered().length">
        No hay notificaciones para mostrar.
      </div>
    </div>
  </div>
  `,
  styles: [`
    :host { display:block; color:#e5e7eb; }
    .page { display:flex; flex-direction:column; gap:16px; }

    .metrics {
      display:grid; grid-template-columns: repeat(3, 240px) 1fr auto; gap:12px; align-items:center;
    }
    .metric {
      position:relative; background:#0f172a; border:1px solid rgba(255,255,255,.08);
      border-radius:12px; padding:16px; display:flex; align-items:center; gap:12px;
    }
    .metric mat-icon { margin-left:auto; opacity:.8; }
    .metric mat-icon.warn { color:#f59e0b; }
    .metric mat-icon.ok   { color:#22c55e; }
    .big { font-size:36px; font-weight:700; line-height:1; }
    .muted { color:#9aa3b2; }

    .spacer { flex:1 1 auto; }
    .mini { margin-left:6px; font-size:12px; color:#9aa3b2; }

    .tabs { display:flex; gap:8px; }
    .pill {
      background:#0b1220; color:#e5e7eb; border:1px solid rgba(255,255,255,.1);
      padding:6px 12px; border-radius:999px; cursor:pointer;
    }
    .pill.active { background:#e5e7eb; color:#0b1220; font-weight:700; }
    .badge-num {
      margin-left:6px; padding:0 8px; border-radius:999px; background:#7f1d1d; color:#ffdfe0;
      font-size:12px;
    }

    .list { display:flex; flex-direction:column; gap:12px; }
    .card {
      background:#0f172a; border:1px solid rgba(255,255,255,.08); border-radius:12px; padding:12px;
    }
    .header { display:flex; align-items:center; justify-content:space-between; gap:10px; }
    .left { display:flex; align-items:center; gap:10px; }
    .title { font-weight:700; }
    .chip { font-size:12px; padding:4px 10px; border-radius:999px; text-transform:uppercase; letter-spacing:.3px; }
    .chip.i { background:#1e3a8a; color:#bfdbfe; }
    .chip.w { background:#7c2d12; color:#fed7aa; }
    .chip.s { background:#14532d; color:#bbf7d0; }
    .chip.e { background:#4c0519; color:#fecdd3; }
    .dot { width:8px; height:8px; border-radius:50%; background:#60a5fa; }
    .actions { display:flex; align-items:center; gap:8px; }
    .body { color:#cbd5e1; margin:10px 0 6px; }
    .foot { color:#9aa3b2; font-size:12px; }
    @media (max-width: 1100px){ .metrics { grid-template-columns: 1fr; } }
  `]
})
export class NotificacionesComponent {
  private facade = inject(NotificacionesFacade);

  tab = signal<Tab>('unread');

  total = this.facade.total;
  unreadCount = this.facade.unreadCount;
  readCount = this.facade.readCount;

  filtered = computed<Notificacion[]>(() => {
    const t = this.tab();
    if (t === 'unread') return this.facade.unread();
    if (t === 'read')   return this.facade.read();
    return this.facade.items();
  });

  ngOnInit(){ this.facade.load(); }

  markAll(){ this.facade.marcarTodasLeidas(); }
  markOne(n: Notificacion){ this.facade.marcarLeida(n.id); }
  remove(n: Notificacion){ this.facade.eliminar(n.id); }
}
