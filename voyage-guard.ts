import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth'; // thabbet fel path mta3 auth.ts

export const voyageGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true; // Kenou ADMIN y-khallih y-dkhol
  } else {
    router.navigate(['/app-forbidden']); // Kenou mouch ADMIN y-rajja3ou (wela router.navigate(['/login']))
    return false;
  }
};