import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersViewComponent } from './customers-view/customers-view.component';
import { CustomersFormComponent } from './customers-form/customers-form.component';


const routes: Routes = [
  { path: '', component: CustomersViewComponent },
  { path: 'new', component: CustomersFormComponent },
  { path: ':id', component: CustomersFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
