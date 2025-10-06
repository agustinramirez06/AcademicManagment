import { Injectable, computed, signal } from '@angular/core';

export interface IncriptoItem {
  alumno: string;
  materia: string;
  fechaFinal: string;        // YYYY-MM-DD
  estado: 'inscripto' | 'aprobado' | 'desaprobado' | 'ausente';
  fechaInscripcion: string;  // YYYY-MM-DD
}

@Injectable({ providedIn: 'root' })
export class InscriptosFacade {
  private _rows = signal<IncriptoItem[]>([]);

  // público (solo lectura)
  rows = computed<IncriptoItem[]>(() => this._rows());

  // lista de materias únicas (para filtro)
  materias = computed<string[]>(() => {
    const set = new Set(this._rows().map(r => r.materia));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  });

  load() {
    // MOCK – reemplazá por HttpClient
    this._rows.set([
      { alumno: 'Carlos Rodríguez', materia: 'Programación I', fechaFinal: '2024-02-15', estado: 'inscripto', fechaInscripcion: '2024-01-15' },
      { alumno: 'Ana López',        materia: 'Programación I', fechaFinal: '2024-02-15', estado: 'inscripto', fechaInscripcion: '2024-01-16' },
      // agregá más si querés
    ]);
  }
}
