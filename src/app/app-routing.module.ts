import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedComponent, UnauthenticatedComponent } from '@core/templates';
import { authGuard } from '@core/guards';

const routes: Routes = [
  { path: '', redirectTo: 'schedules', pathMatch: 'full' },
  {
    path: '',
    component: AuthenticatedComponent,
    children: [
      {
        path: 'schedules',
        loadChildren: () => import('./views/schedules/schedules.module').then(m => m.SchedulesModule),
        canActivate: [authGuard()],
      },
      {
        path: 'barbers',
        loadChildren: () => import('./views/barbers/barbers.module').then(m => m.BarbersModule),
        canActivate: [authGuard()],
      },
      {
        path: 'customers',
        loadChildren: () => import('./views/customers/customers.module').then(m => m.CustomersModule),
        canActivate: [authGuard()],
      },
      {
        path: 'labors',
        loadChildren: () => import('./views/labors/labors.module').then(m => m.LaborsModule),
        canActivate: [authGuard()],
      },
      {
        path: 'logs',
        loadChildren: () => import('./views/logs/logs.module').then(m => m.LogsModule),
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
        loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
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
