import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/modules';
import { UserLevelPipe } from '@shared/pipes';
import { UsersRoutingModule } from './users-routing.module';
import { UsersViewComponent } from './users-view/users-view.component';
import { UsersFormComponent } from './users-form/users-form.component';

@NgModule({
  declarations: [UsersViewComponent, UsersFormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    UserLevelPipe,
  ],
})
export default class UsersModule {}
