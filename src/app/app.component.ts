import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <!-- Contenedor raíz de la app -->
    <router-outlet />
  `,
})
export class AppComponent implements OnInit {
  private theme = inject(ThemeService);

  ngOnInit(): void {
    // Reaplica el tema guardado para toda la app
    const saved = (localStorage.getItem('theme') as 'dark' | 'light' | null) ?? 'dark';
    this.theme.applyTheme(saved);
  }
}
