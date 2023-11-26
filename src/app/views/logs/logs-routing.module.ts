import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogsViewComponent } from './logs-view/logs-view.component';

const routes: Routes = [
  { path: '', component: LogsViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
