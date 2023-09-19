import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';

import { FilterComponent } from '@shared/components';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersFormComponent } from './customers-form/customers-form.component';
import { CustomersViewComponent } from './customers-view/customers-view.component';

@NgModule({
  declarations: [
    CustomersViewComponent,
    CustomersFormComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmPopupModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    SkeletonModule,
    SplitButtonModule,
    TableModule,
    FilterComponent
  ],
  providers: [ConfirmationService]
})
export class CustomersModule { }
