import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const oauthService: AuthService = inject(AuthService);

  if (localStorage.getItem('auth-user')) {
    return true;
  }
  oauthService.redirectLogin();
  return false;
};
