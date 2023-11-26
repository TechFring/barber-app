import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/modules';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
