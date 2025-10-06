import { Injectable, computed, signal } from '@angular/core';

export interface PlanRow {
  materia: string;
  profesor: string;
  correlativas: string;
}
export type YearKey = '1' | '2' | '3';

@Injectable({ providedIn: 'root' })
export class PlanCurricularFacade {
  // mapa año -> filas
  private _plan = signal<Record<YearKey, PlanRow[]>>({ '1': [], '2': [], '3': [] });

  planPorAnio = (anio: YearKey) => computed<PlanRow[]>(() => this._plan()[anio]);

  load() {
    // MOCK — reemplazá por HttpClient
    this._plan.set({
      '1': [
        { materia: 'Programación I', profesor: 'Juan Pérez',   correlativas: 'Sin correlativas' },
        { materia: 'Matemática I',   profesor: 'María González', correlativas: 'Sin correlativas' },
      ],
      '2': [
        { materia: 'Programación II', profesor: 'Juan Pérez', correlativas: 'Programación I' },
      ],
      '3': [
        { materia: 'Práctica Profesional', profesor: 'Equipo docente', correlativas: 'Aprobación de 2º año' },
      ],
    });
  }

  // util para exportar el año actual
  getYear(anio: YearKey): PlanRow[] { return this._plan()[anio] ?? []; }
}
