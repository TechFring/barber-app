import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';

import { SharedModule } from '@shared/modules';
import { BarbersRoutingModule } from './barbers-routing.module';
import { BarbersViewComponent } from './barbers-view/barbers-view.component';
import { BarbersFormComponent } from './barbers-form/barbers-form.component';

@NgModule({
  declarations: [BarbersViewComponent, BarbersFormComponent],
  imports: [
    SharedModule,
    BarbersRoutingModule,
    CalendarModule,
  ],
})
export class BarbersModule {}
