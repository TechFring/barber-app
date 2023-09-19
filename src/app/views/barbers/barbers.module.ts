import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { FilterComponent } from '@shared/components';
import { BarbersRoutingModule } from './barbers-routing.module';
import { BarbersViewComponent } from './barbers-view/barbers-view.component';
import { BarbersFormComponent } from './barbers-form/barbers-form.component';

@NgModule({
  declarations: [
    BarbersViewComponent,
    BarbersFormComponent
  ],
  imports: [
    CommonModule,
    BarbersRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    CalendarModule,
    ConfirmPopupModule,
    DropdownModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    SplitButtonModule,
    SkeletonModule,
    InputSwitchModule,
    TableModule,
    TagModule,
    FilterComponent,
  ],
  providers: [ConfirmationService]
})
export class BarbersModule { }
