import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';

import { SharedModule } from '@shared/modules';
import { LogsRoutingModule } from './logs-routing.module';
import { LogsViewComponent } from './logs-view/logs-view.component';

@NgModule({
  declarations: [LogsViewComponent],
  imports: [
    CommonModule,
    LogsRoutingModule,
    SharedModule,
    CalendarModule,
  ],
})
export class LogsModule {}
