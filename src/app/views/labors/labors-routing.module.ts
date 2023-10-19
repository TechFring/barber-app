import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LaborsViewComponent } from './labors-view/labors-view.component';
import { LaborsFormComponent } from './labors-form/labors-form.component';

const routes: Routes = [
  { path: '', component: LaborsViewComponent },
  { path: 'new', component: LaborsFormComponent },
  { path: ':laborId', component: LaborsFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaborsRoutingModule { }
