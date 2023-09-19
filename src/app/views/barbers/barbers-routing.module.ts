import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BarbersViewComponent, BarbersFormComponent } from '@views/barbers';

const routes: Routes = [
  { path: '', component: BarbersViewComponent },
  { path: 'new', component: BarbersFormComponent },
  { path: ':barberId', component: BarbersFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarbersRoutingModule { }
