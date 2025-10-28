import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule }   from '@angular/material/icon';
import { MatBadgeModule }  from '@angular/material/badge';
import { MatMenuModule }   from '@angular/material/menu';
import { MatDividerModule }from '@angular/material/divider';
import { MatTooltipModule }from '@angular/material/tooltip';

import { NotificacionesFacade, Notificacion } from '../../services/notificaciones.facade';

type Filtro = 'unread' | 'read' | 'all';

@Component({
  standalone: true,
  selector: 'app-notificaciones',
  imports: [
    CommonModule, DatePipe,
    MatButtonModule, MatIconModule, MatBadgeModule, MatMenuModule,
    MatDividerModule, MatTooltipModule
  ],
  template: `
  <section class="page">
    <h1 class="page-title">Notificaciones</h1>

    <div class="kpis">
      <div class="kpi">
        <div class="kpi-title">Total</div>
        <div class="kpi-value"><mat-icon>notifications</mat-icon> <span>{{ total() }}</span></div>
      </div>
      <div class="kpi">
        <div class="kpi-title">No leídas</div>
        <div class="kpi-value"><mat-icon>priority_high</mat-icon> <span>{{ unread() }}</span></div>
      </div>
      <div class="kpi">
        <div class="kpi-title">Leídas</div>
        <div class="kpi-value"><mat-icon>check_circle</mat-icon> <span>{{ read() }}</span></div>
      </div>
    </div>

    <div class="actions-bar">
      <div class="tabs">
        <button class="tab" [class.active]="filtro() === 'unread'" (click)="setFiltro('unread')">
          No leídas <span class="bubble" *ngIf="unread()">{{ unread() }}</span>
        </button>
        <button class="tab" [class.active]="filtro() === 'read'" (click)="setFiltro('read')">Leídas</button>
        <button class="tab" [class.active]="filtro() === 'all'" (click)="setFiltro('all')">Todas</button>
      </div>

      <button mat-stroked-button color="primary"
              (click)="marcarTodas()"
              [disabled]="unread() === 0">
        <mat-icon>done_all</mat-icon>
        Marcar todas como leídas
        <span class="chip" *ngIf="unread()">{{ unread() }} no leídas</span>
      </button>
    </div>

    <div class="list card">
      @for (n of visibles(); track n.id) {
        <div class="item" [class.unread]="!n.leida">
          <div class="col icon-col">
            <mat-icon [ngClass]="n.tipo">{{ icono(n.tipo) }}</mat-icon>
          </div>

          <div class="col content-col">
            <div class="title-row">
              <div class="title">
                {{ n.titulo }}
                <span class="pill" [ngClass]="n.tipo">{{ label(n.tipo) }}</span>
              </div>
              <div class="meta">
                {{ n.fecha | date:'dd/MM/yyyy, HH:mm' }}
                <span class="dot" *ngIf="!n.leida" matTooltip="No leída"></span>
              </div>
            </div>

            <div class="msg">{{ n.mensaje }}</div>

            <div class="actions">
              <button mat-stroked-button color="primary"
                      (click)="marcar(n)"
                      [disabled]="n.leida">
                <mat-icon>done</mat-icon> Marcar como leída
              </button>
              <button mat-stroked-button color="warn" (click)="eliminar(n)">
                <mat-icon>delete</mat-icon> Eliminar
              </button>
            </div>
          </div>
        </div>
        <mat-divider />
      }
      @empty {
        <div class="empty">
          <mat-icon>notifications_none</mat-icon>
          <p>No hay notificaciones en esta vista.</p>
        </div>
      }
    </div>
  </section>
  `,
  styles: [`
  .page { padding: 8px; }
  .page-title { margin: 8px 0 16px; color: var(--app-text); }
  .kpis { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:12px; margin-bottom: 16px; }
  .kpi { background: var(--app-surface); border:1px solid var(--app-border); border-radius:12px; padding:12px; }
  .kpi-title { color: var(--app-muted); font-size: 13px; margin-bottom: 6px; }
  .kpi-value { display:flex; align-items:center; gap:8px; font-weight:700; color: var(--app-text); }
  .actions-bar { display:flex; align-items:center; gap:12px; justify-content: space-between; margin-bottom: 12px; }
  .tabs { display:flex; gap:6px; }
  .tab { border:1px solid var(--app-border); background: var(--app-surface); color: var(--app-text); padding:6px 12px; border-radius: 999px; cursor:pointer; }
  .tab.active { background: rgba(220,38,38,.12); border-color: rgba(220,38,38,.22); }
  .bubble { margin-left: 6px; background:#dc2626; color:#fff; border-radius: 999px; padding:0 6px; font-size:12px; }
  .chip { margin-left: 8px; background: var(--app-hover); border:1px solid var(--app-border); padding:2px 8px; border-radius: 999px; }
  .card { background: var(--app-surface); border:1px solid var(--app-border); border-radius:12px; box-shadow: var(--app-shadow); }
  .list { overflow: hidden; }
  .item { display:flex; gap:12px; padding: 14px; align-items:flex-start; }
  .item.unread { background: color-mix(in srgb, var(--app-surface) 90%, var(--app-text) 10%); }
  .icon-col { width: 40px; display:grid; place-items:center; }
  .content-col { flex:1; min-width:0; }
  .title-row { display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .title { color: var(--app-text); font-weight: 700; display:flex; align-items:center; gap:8px; }
  .msg { color: var(--app-muted); margin-top: 4px; }
  .meta { color: var(--app-muted); font-size: 12px; display:flex; align-items:center; gap:8px; }
  .dot { width:8px; height:8px; border-radius:50%; background:#60a5fa; display:inline-block; }
  .actions { display:flex; gap:8px; margin-top:10px; }
  .pill { font-size:11px; padding:2px 8px; border-radius:999px; border:1px solid var(--app-border); }
  .pill.info { background: transparent; color: var(--app-text); border-color: var(--app-border); }
  .pill.success { background:#063; color:#b8f7d4; }
  .pill.warning { background:#2a1f00; color:#ffd27a; }
  .pill.error { background:#3b0d0d; color:#ffb4b4; }
  .empty { text-align:center; padding: 32px; color: var(--app-muted); }
  .empty mat-icon { font-size: 40px; height:40px; width:40px; display:block; margin: 0 auto 8px; }
  /* Responsive adjustments */
  @media (max-width: 900px) { .kpis { grid-template-columns: 1fr; } }

  /* Small screens: stack notification content vertically so text and actions don't overlap */
  @media (max-width: 700px) {
    .actions-bar { flex-direction: column; align-items: stretch; gap: 8px; }
    .tabs { flex-wrap: wrap; }
    .tab { padding:6px 10px; }

    .list { overflow: visible; }
    .item { flex-direction: column; gap:10px; padding:12px; }
    .icon-col { width: 44px; }
    .title-row { flex-direction: column; align-items: flex-start; gap:6px; }
    .meta { order: 2; }
    .msg { order: 3; }
    .actions { order: 4; display: flex; gap:8px; flex-wrap:wrap; }
    .actions button { flex: 1 1 auto; min-width: 120px; }
  }

  /* Very small screens: make action buttons full width and reduce paddings */
  @media (max-width: 420px) {
    .item { padding:10px; }
    .icon-col { width: 36px; }
    .title { font-size: 15px; }
    .msg { font-size: 13px; }
    .actions button { flex: 1 1 100%; }
    .chip { display:none; }
  }
  `]
})
export class NotificacionesComponent {
  private readonly facade = inject(NotificacionesFacade);
  readonly filtro = signal<Filtro>('unread');

  // KPIs (nos suscribimos con signals puenteados)
  total  = signal(0);
  unread = signal(0);
  read   = signal(0);

  constructor() {
    this.facade.totalCount$.subscribe(v => this.total.set(v));
    this.facade.unreadCount$.subscribe(v => this.unread.set(v));
    this.facade.readCount$.subscribe(v => this.read.set(v));
  }

  visibles = computed<Notificacion[]>(() => {
    // Adaptamos a signals sincrónicos con snapshots simples:
    let arr: Notificacion[] = [];
    const push = (list: Notificacion[]) => arr = list;

    if (this.filtro() === 'unread') {
      this.facade.unread$.subscribe(push).unsubscribe();
    } else if (this.filtro() === 'read') {
      this.facade.read$.subscribe(push).unsubscribe();
    } else {
      this.facade.all$.subscribe(push).unsubscribe();
    }
    return arr;
  });

  setFiltro(f: Filtro) { this.filtro.set(f); }
  marcar(n: Notificacion) { this.facade.marcarComoLeida(n.id); }
  eliminar(n: Notificacion) { this.facade.eliminar(n.id); }
  marcarTodas() { this.facade.marcarTodasComoLeidas(); }

  icono(tipo: Notificacion['tipo']) {
    switch (tipo) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error':   return 'error';
      default:        return 'info';
    }
  }
  label(tipo: Notificacion['tipo']) {
    switch (tipo) {
      case 'success': return 'ok';
      case 'warning': return 'alerta';
      case 'error':   return 'error';
      default:        return 'info';
    }
  }
}
