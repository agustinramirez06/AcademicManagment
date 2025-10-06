import { Injectable, signal } from '@angular/core';

export interface ActaResumen {
  id: number;
  materia: string;
  fecha: string;      // ISO o legible
  inscriptos: number;
  estado: 'programado' | 'en_proceso' | 'cerrado';
}

export interface AlumnoActa {
  nombre: string;
  dni: string;
  estado: 'inscripto' | 'ausente' | 'aprobado' | 'desaprobado';
}

export interface ActaDetalle extends ActaResumen {
  hora?: string;
  titular?: string;
  acompaniante?: string;
  alumnos: AlumnoActa[];
}

@Injectable({ providedIn: 'root' })
export class ActasFacade {
  // listado
  actas = signal<ActaResumen[]>([]);

  // detalle cacheado por id
  private _detalles = new Map<number, ActaDetalle>();

  loadListado() {
    // MOCK: reemplazar por HttpClient
    this.actas.set([
      { id: 1, materia: 'Programación I',  fecha: '2024-02-15', inscriptos: 2, estado: 'programado' },
      { id: 2, materia: 'Programación II', fecha: '2024-03-01', inscriptos: 0, estado: 'programado' }
    ]);
  }

  async getDetalle(id: number): Promise<ActaDetalle> {
    if (this._detalles.has(id)) return this._detalles.get(id)!;

    // MOCK: simular fetch a API
    const base = this.actas().find(a => a.id === id)!;
    const detalle: ActaDetalle = {
      ...base,
      hora: id === 1 ? '09:00' : '10:00',
      titular: 'Juan Pérez',
      acompaniante: 'María González',
      alumnos: id === 1
        ? [
            { nombre:'Carlos Rodríguez', dni:'11111111', estado:'inscripto' },
            { nombre:'Ana López',        dni:'22222222', estado:'inscripto' },
          ]
        : []
    };

    this._detalles.set(id, detalle);
    return detalle;
  }
}
