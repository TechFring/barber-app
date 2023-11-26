import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemConst } from '@core/constants';
import { AuthenticatedComponent, UnauthenticatedComponent } from '@core/templates';
import { authGuard } from '@core/guards';

const routes: Routes = [
  { path: '', redirectTo: SystemConst.DEFAULT_ROUTE, pathMatch: 'full' },
  {
    path: '',
    component: AuthenticatedComponent,
    children: [
      {
        path: SystemConst.ROUTES.schedules.base,
        loadChildren: () => import('./views/schedules/schedules.module'),
        data: { title: 'Agendamentos' },
        canActivate: [authGuard()],
      },
      {
        path: SystemConst.ROUTES.barbers.base,
        loadChildren: () => import('./views/barbers/barbers.module'),
        data: { title: 'Barbeiros' },
        canActivate: [authGuard()],
      },
      {
        path: 'customers',
        loadChildren: () => import('./views/customers/customers.module'),
        data: { title: 'Clientes' },
        canActivate: [authGuard()],
      },
      {
        path: 'labors',
        loadChildren: () => import('./views/labors/labors.module'),
        data: { title: 'Serviços' },
        canActivate: [authGuard()],
      },
      {
        path: 'users',
        loadChildren: () => import('./views/users/users.module'),
        data: { title: 'Usuários' },
        canActivate: [authGuard()],
      },
      {
        path: 'logs',
        loadChildren: () => import('./views/logs/logs.module'),
        data: { title: 'Logs' },
        canActivate: [authGuard()],
      },
    ]
  },
  {
    path: '',
    component: UnauthenticatedComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./views/auth/auth.module'),
        canActivate: [authGuard(false)],
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'auth'
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
