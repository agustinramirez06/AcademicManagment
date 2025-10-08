import { Injectable, computed, signal } from '@angular/core';

export type NotiLevel = 'info' | 'warning' | 'success' | 'error';

export interface Notificacion {
  id: number;
  titulo: string;
  detalle: string;
  fechaIso: string;  // ISO 8601
  nivel: NotiLevel;
  leida: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificacionesFacade {
  private _items = signal<Notificacion[]>([]);

  // públicos (solo-lectura)
  items = computed<Notificacion[]>(() => this._items());
  total = computed(() => this._items().length);
  unread = computed(() => this._items().filter(n => !n.leida));
  read = computed(() => this._items().filter(n => n.leida));
  unreadCount = computed(() => this.unread().length);
  readCount = computed(() => this.read().length);

  load() {
    // MOCK: reemplazá con HttpClient si tenés backend
    this._items.set([
      {
        id: 1,
        titulo: 'Nuevo alumno inscripto',
        detalle: 'El alumno Carlos Rodríguez se ha inscripto a Programación I',
        fechaIso: '2024-01-15T07:30:00',
        nivel: 'info',
        leida: false,
      }
    ]);
  }

  marcarLeida(id: number) {
    this._items.update(list =>
      list.map(n => n.id === id ? { ...n, leida: true } : n)
    );
  }

  marcarTodasLeidas() {
    this._items.update(list => list.map(n => ({ ...n, leida: true })));
  }

  eliminar(id: number) {
    this._items.update(list => list.filter(n => n.id !== id));
  }
}
