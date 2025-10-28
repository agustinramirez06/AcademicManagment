import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export type NotiTipo = 'info' | 'warning' | 'success' | 'error';

export interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  fecha: string;   // ISO
  tipo: NotiTipo;
  leida: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificacionesFacade {
  private readonly _items$ = new BehaviorSubject<Notificacion[]>([
    {
      id: 'n1',
      titulo: 'Nuevo alumno inscripto',
      mensaje: 'Carlos Rodríguez se inscribió a Programación I',
      fecha: new Date().toISOString(),
      tipo: 'info',
      leida: false,
    },
  ]);

  readonly all$    = this._items$.asObservable();
  readonly unread$ = this.all$.pipe(map(list => list.filter(n => !n.leida)));
  readonly read$   = this.all$.pipe(map(list => list.filter(n =>  n.leida)));

  readonly totalCount$:  Observable<number> = this.all$.pipe(map(l => l.length));
  readonly unreadCount$: Observable<number> = this.unread$.pipe(map(l => l.length));
  readonly readCount$:   Observable<number> = this.read$.pipe(map(l => l.length));

  marcarComoLeida(id: string) {
    const next = this._items$.value.map(n => n.id === id ? { ...n, leida: true } : n);
    this._items$.next(next);
  }

  marcarTodasComoLeidas() {
    this._items$.next(this._items$.value.map(n => ({ ...n, leida: true })));
  }

  eliminar(id: string) {
    this._items$.next(this._items$.value.filter(n => n.id !== id));
  }
}
