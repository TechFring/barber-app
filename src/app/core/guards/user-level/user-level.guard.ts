import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UsersService } from '@core/services';
import { UserLevelEnum } from '@core/models';
import { SystemConst } from '@core/constants';

export const userLevelGuard = (level: UserLevelEnum): CanActivateFn => {
  return (route, state): boolean => {
    const authUser = inject(UsersService).authenticatedUser!;
    const hasPermission = authUser.level >= level;

    if (!hasPermission) {
      return (inject(Router).navigateByUrl(SystemConst.DEFAULT_ROUTE), false);
    }

    return true;
  };
};
