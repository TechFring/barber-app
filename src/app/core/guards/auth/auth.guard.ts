import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UsersService } from '@core/services';

export const authGuard = (templateAuthenticated = true): CanActivateFn => {
  return (route, state): boolean => {
    const userService = inject(UsersService);
    const isAuthenticated = userService.isAuthenticated;

    if (templateAuthenticated) {
      if (isAuthenticated) {
        return true;
      }

      return (userService.logout(), false);
    } else {
      if (!isAuthenticated) {
        return true;
      }

      return (inject(Router).navigateByUrl('/'), false);
    }
  }
}
