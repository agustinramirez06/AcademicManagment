import { Injectable, signal } from '@angular/core';

export interface FinalItem {
  id: number;
  carrera: string;
  materia: string;
  fecha: string;   // ISO o legible
  hora: string;    // HH:mm
  inscriptos: number;
  titular: string;
  acompaniante?: string;
  estado: 'programado' | 'pendiente' | 'cerrado';
}

@Injectable({ providedIn: 'root' })
export class FinalesFacade {
  finales = signal<FinalItem[]>([]);

  load() {
    // MOCK: reemplaza por HttpClient
    this.finales.set([
      {
        id: 1,
        carrera: 'Tecnicatura en Programación',
        materia: 'Programación I',
        fecha: '2024-02-15',
        hora: '09:00',
        inscriptos: 2,
        titular: 'Juan Pérez',
        acompaniante: 'María González',
        estado: 'programado'
      },
      {
        id: 2,
        carrera: 'Tecnicatura en Programación',
        materia: 'Programación II',
        fecha: '2024-03-01',
        hora: '10:00',
        inscriptos: 0,
        titular: 'Juan Pérez',
        estado: 'programado'
      }
    ]);
  }

  solicitarCambio(payload: {
    finalId: number;
    tipo: 'fecha-hora' | 'acompaniante' | 'cancelacion' | 'otro';
    motivo: string;
  }) {
    // acá harías POST a tu API
    console.log('[SOLICITAR CAMBIO]', payload);
  }
}
