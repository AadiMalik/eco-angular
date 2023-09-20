import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const oauthService: AuthService = inject(AuthService);

  let checkAuth = oauthService.reloadAuth;
  if (!checkAuth) {
    return false;
  }
  return true;
};
