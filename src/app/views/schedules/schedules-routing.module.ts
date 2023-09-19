import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchedulesViewComponent } from '@views/schedules';

const routes: Routes = [
  { path: '', component: SchedulesViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRoutingModule { }
