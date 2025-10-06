import { Injectable, signal } from '@angular/core';

export interface CorrelativaRow {
  materia: string;
  materiaCorrelativa: string;
  anio: string; // ej. "2°"
}

@Injectable({ providedIn: 'root' })
export class CorrelativasFacade {
  rows = signal<CorrelativaRow[]>([]);

  load() {
    // MOCK — reemplazá por HttpClient
    this.rows.set([
      { materia: 'Programación II', materiaCorrelativa: 'Programación I', anio: '2°' }
    ]);
  }
}
