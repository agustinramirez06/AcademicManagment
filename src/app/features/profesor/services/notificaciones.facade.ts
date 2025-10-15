import { Injectable, computed, signal } from '@angular/core';

export type NotiTipo = 'info' | 'warning' | 'success' | 'error';

export interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  fecha: string;        // ISO string
  tipo: NotiTipo;
  leida: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificacionesFacade {

  /** Estado en memoria — reemplazá por la llamada a tu API cuando la tengas */
  private readonly _items = signal<Notificacion[]>([
    {
      id: 'n1',
      titulo: 'Nuevo alumno inscripto',
      mensaje: 'El alumno Carlos Rodríguez se ha inscripto a Programación I',
      fecha: '2025-01-15T07:30:00Z',
      tipo: 'info',
      leida: false,
    },
    // podés agregar más de ejemplo
  ]);

  /** Selectores */
  readonly all   = computed(() => this._items());
  readonly unread = computed(() => this._items().filter(n => !n.leida));
  readonly read   = computed(() => this._items().filter(n =>  n.leida));

  /** Contadores para cards superiores */
  readonly totalCount  = computed(() => this._items().length);
  readonly unreadCount = computed(() => this.unread().length);
  readonly readCount   = computed(() => this.read().length);

  /** Acciones */
  marcarComoLeida(id: string) {
    this._items.update(list =>
      list.map(n => n.id === id ? { ...n, leida: true } : n)
    );
  }

  marcarTodasComoLeidas() {
    this._items.update(list => list.map(n => ({ ...n, leida: true })));
  }

  eliminar(id: string) {
    this._items.update(list => list.filter(n => n.id !== id));
  }
}
