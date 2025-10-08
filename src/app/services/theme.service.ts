import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<'dark' | 'light'>('dark');

  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      this.theme.set(saved);
      this.applyTheme(saved);
    } else {
      // Detectar preferencia del SO
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }

    // Guarda y aplica cada vez que cambia
    effect(() => {
      const mode = this.theme();
      this.applyTheme(mode);
      localStorage.setItem('theme', mode);
    });
  }

  toggle() {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(mode: 'dark' | 'light') {
    this.theme.set(mode);
  }

  private applyTheme(mode: 'dark' | 'light') {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }
}
