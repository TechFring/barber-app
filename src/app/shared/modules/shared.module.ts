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
import { ToggleStatusButtonDirective, RegisterStatusDirective, ActionsButtonDirective } from '@shared/directives';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmPopupModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    SkeletonModule,
    SplitButtonModule,
    TableModule,
    FilterComponent,
    ToggleStatusButtonDirective,
    RegisterStatusDirective,
    ActionsButtonDirective,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmPopupModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    SkeletonModule,
    SplitButtonModule,
    TableModule,
    FilterComponent,
    ToggleStatusButtonDirective,
    RegisterStatusDirective,
    ActionsButtonDirective,
  ],
  providers: [ConfirmationService],
})
export class SharedModule {}
