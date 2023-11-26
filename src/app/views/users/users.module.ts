import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/modules';
import { UsersRoutingModule } from './users-routing.module';
import { UsersViewComponent } from './users-view/users-view.component';

@NgModule({
  declarations: [
    UsersViewComponent
  ],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export default class UsersModule {}
