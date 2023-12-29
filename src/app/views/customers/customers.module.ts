import { NgModule } from '@angular/core';

import { RegisterStatusDirective } from '@shared/directives';
import { SharedModule } from '@shared/modules';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersFormComponent } from './customers-form/customers-form.component';
import { CustomersViewComponent } from './customers-view/customers-view.component';

@NgModule({
  declarations: [CustomersViewComponent, CustomersFormComponent],
  imports: [SharedModule, CustomersRoutingModule, RegisterStatusDirective],
})
export default class CustomersModule {}
