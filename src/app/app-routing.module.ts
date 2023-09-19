import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'schedules',
    loadChildren: () => import('./views/schedules/schedules.module').then(m => m.SchedulesModule)
  },
  {
    path: 'barbers',
    loadChildren: () => import('./views/barbers/barbers.module').then(m => m.BarbersModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./views/customers/customers.module').then(m => m.CustomersModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
