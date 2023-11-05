import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PermissionsService } from '@shared/services/permisions.service';
import { AuthService } from 'src/app/shared/services/auth.service';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const permissionsService = inject(PermissionsService);
  if (
    localStorage.getItem('username') ||
    authService.getSecOption == 'loggedIn'
  ) {
    let path_pieces = state.url.split('/');
    let type: 'main' | 'sub' = path_pieces.length > 2 ? 'sub' : 'main';
    let page = '/' + state.url.split('/')[1];
    if (type == 'sub') {
      page += '/' + state.url.split('/')[2];
    }
    console.log(`type`);
    console.log(type);
    console.log(`page`);
    console.log(page);

    if (permissionsService.checkPagePermission(page)) {
      return true;
    } else {
      authService.goToForbidden();
    }
  }
  authService.logoutLocal();
  return false;
};
