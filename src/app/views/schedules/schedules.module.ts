import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesViewComponent } from './schedules-view/schedules-view.component';
import { SchedulesDialogComponent } from './schedules-dialog/schedules-dialog.component';

@NgModule({
  declarations: [
    SchedulesViewComponent,
    SchedulesDialogComponent
  ],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    FullCalendarModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    MultiSelectModule
  ]
})
export class SchedulesModule { }
