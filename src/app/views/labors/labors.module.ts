import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/modules';
import { MinutesToTimePipe } from '@shared/pipes';
import { LaborsRoutingModule } from './labors-routing.module';
import { LaborsViewComponent } from './labors-view/labors-view.component';
import { LaborsFormComponent } from './labors-form/labors-form.component';
import { RegisterStatusDirective } from '@shared/directives';

@NgModule({
  declarations: [LaborsViewComponent, LaborsFormComponent],
  imports: [SharedModule, LaborsRoutingModule, MinutesToTimePipe, RegisterStatusDirective],
})
export default class LaborsModule { }
