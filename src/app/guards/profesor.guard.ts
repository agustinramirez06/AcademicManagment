import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const profesorGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = localStorage.getItem('user') || '';
  const isProfesor = user.toLowerCase().startsWith('profesor');

  if (isProfesor) return true;

  router.navigate(['/login']);
  return false;
};
