import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-alumno-dashboard',
  template: `
    <h2>Bienvenido al Panel del Alumno</h2>
    <p>Has iniciado sesión correctamente como <b>alumno1</b>.</p>
  `
})
export class DashboardComponent {}
