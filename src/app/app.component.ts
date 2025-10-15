import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
<<<<<<< Updated upstream
export class AppComponent {}
=======
export class AppComponent implements OnInit {
  private theme = inject(ThemeService);
  ngOnInit() {
    // Reaplica el tema guardado al iniciar
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    this.theme.applyTheme(saved ?? 'dark');
  }
}
>>>>>>> Stashed changes
