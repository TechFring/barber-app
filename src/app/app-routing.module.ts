import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemConst } from '@core/constants';
import { AuthenticatedComponent, UnauthenticatedComponent } from '@core/templates';
import { authGuard, userLevelGuard } from '@core/guards';

const routes: Routes = [
  { path: '', redirectTo: SystemConst.DEFAULT_ROUTE, pathMatch: 'full' },
  {
    path: '',
    component: AuthenticatedComponent,
    children: [
      {
        path: SystemConst.ROUTES.schedules.base,
        loadChildren: () => import('./views/schedules/schedules.module'),
        data: { title: SystemConst.ROUTES.schedules.title },
        canActivate: [authGuard()],
      },
      {
        path: SystemConst.ROUTES.barbers.base,
        loadChildren: () => import('./views/barbers/barbers.module'),
        data: { title: SystemConst.ROUTES.barbers.title },
        canActivate: [authGuard()],
      },
      {
        path: SystemConst.ROUTES.customers.base,
        loadChildren: () => import('./views/customers/customers.module'),
        data: { title: SystemConst.ROUTES.customers.title },
        canActivate: [authGuard()],
      },
      {
        path: SystemConst.ROUTES.labors.base,
        loadChildren: () => import('./views/labors/labors.module'),
        data: { title: SystemConst.ROUTES.labors.title },
        canActivate: [authGuard()],
      },
      {
        path: SystemConst.ROUTES.users.base,
        loadChildren: () => import('./views/users/users.module'),
        data: { title: SystemConst.ROUTES.users.title },
        canActivate: [authGuard(), userLevelGuard(SystemConst.ROUTES.users.level)],
      },
      {
        path: SystemConst.ROUTES.logs.base,
        loadChildren: () => import('./views/logs/logs.module'),
        data: { title: SystemConst.ROUTES.logs.title },
        canActivate: [authGuard(), userLevelGuard(SystemConst.ROUTES.logs.level)],
      },
    ]
  },
  {
    path: '',
    component: UnauthenticatedComponent,
    children: [
      {
        path: SystemConst.ROUTES.auth.base,
        loadChildren: () => import('./views/auth/auth.module'),
        canActivate: [authGuard(false)],
      },
    ]
  },
  {
    path: '**',
    redirectTo: SystemConst.DEFAULT_ROUTE
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true,
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
