import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
	now: Date = new Date();

	stats = [
		{ icon: '👤', value: 4, label: 'Total Usuarios' },
		{ icon: '✅', value: 2, label: 'Profesores Activos' },
		{ icon: '📅', value: 3, label: 'Fechas Programadas' },
		{ icon: '🔔', value: 3, label: 'Notificaciones' }
	];

	notifications = [
		{ title: 'Nuevo alumno inscripto', text: 'El alumno Carlos Rodríguez se ha inscripto a Programación I', date: '15/1/2024' },
		{ title: 'Recordatorio de final', text: 'Tu final de Programación I es el 15/02/2024 a las 09:00', date: '10/2/2024' },
		{ title: 'Nueva fecha de final', text: 'Se programó una nueva fecha para Base de Datos', date: '20/1/2024' }
	];
}
