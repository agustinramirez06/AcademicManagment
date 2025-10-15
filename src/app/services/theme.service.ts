import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  currentTheme = signal<ThemeMode>('dark');
  private readonly storageKey = 'theme';

  constructor() {
    const saved = (localStorage.getItem(this.storageKey) as ThemeMode | null);
    const initial: ThemeMode = saved === 'light' || saved === 'dark' ? saved : 'dark';
    this.applyTheme(initial);
  }

  applyTheme(mode: ThemeMode): void {
    this.currentTheme.set(mode);
    // Aplica clase al body para que Material pinte todo
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${mode}-theme`);
    // Persistencia
    localStorage.setItem(this.storageKey, mode);
  }

  toggleTheme(): void {
    const next: ThemeMode = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
  }
}
