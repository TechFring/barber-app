import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemConst } from '@core/constants';
import { UsersViewComponent } from './users-view/users-view.component';
import { UsersFormComponent } from './users-form/users-form.component';

const routes: Routes = [
  { path: SystemConst.ROUTES.base.view, component: UsersViewComponent },
  { path: SystemConst.ROUTES.base.formNew, component: UsersFormComponent },
  { path: SystemConst.ROUTES.base.formEdit, component: UsersFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class UsersRoutingModule {}
