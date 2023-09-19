import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersViewComponent, CustomersFormComponent } from '@views/customers';


const routes: Routes = [
  { path: '', component: CustomersViewComponent },
  { path: 'new', component: CustomersFormComponent },
  { path: ':customerId', component: CustomersFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
