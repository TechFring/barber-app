import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BarbersViewComponent } from './barbers-view/barbers-view.component';
import { BarbersFormComponent } from './barbers-form/barbers-form.component';

const routes: Routes = [
  { path: '', component: BarbersViewComponent },
  { path: 'new', component: BarbersFormComponent },
  { path: ':id', component: BarbersFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarbersRoutingModule {}
