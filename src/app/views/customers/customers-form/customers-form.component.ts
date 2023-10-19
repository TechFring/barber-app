import { Component, Input } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { CustomersService } from '@core/services';
import { ICustomer } from '@core/models';
import { PrimeNGConst } from '@core/constants';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.scss']
})
export class CustomersFormComponent {
  @Input() public customerId?: string;

  public formGroup = this._fb.group({
    name: this._fb.control('', [Validators.required, Validators.maxLength(100)]),
    phone: this._fb.control('', [Validators.required]),
    email: this._fb.control('', [Validators.required, Validators.email]),
  });
  public editMode!: boolean;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _customersService: CustomersService,
  ) {}

  get pageTitle(): string {
    return this.editMode ? 'Editar cliente' : 'Novo cliente';
  }

  get nameControl(): FormControl {
    return this.formGroup.controls.name;
  }

  get emailControl(): FormControl {
    return this.formGroup.controls.email;
  }

  public ngOnInit(): void {
    this.editMode = !!this.customerId;

    if (this.editMode)
      this._searchCustomerAndUpdateForm();
  }

  public onSave(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid)
      return;

    const customer: ICustomer = {
      id: this.customerId,
      ...this.formGroup.getRawValue()
    };

    const request$ = this.editMode
      ? this._customersService.put(customer)
      : this._customersService.post(customer);

    request$.subscribe({
      next: () => this._router.navigateByUrl('/customers'),
      error: (err: HttpErrorResponse) => this._messageService.add({ severity: 'error', detail: err.error.message })
    });
  }

  public onRemove(event: Event): void {
    this._confirmationService.confirm({
      ...PrimeNGConst.CONFIRMATION,
      target: event.target as EventTarget,
      accept: () => this._deleteBarber()
    });
  }

  private _searchCustomerAndUpdateForm(): void {
    this._customersService.getById(this.customerId as string).subscribe((res) => {
      this.formGroup.patchValue(res);
    });
  }

  private _deleteBarber(): void {
    this._customersService.delete(this.customerId as string).subscribe(() => this._router.navigateByUrl('/customers'));
  }
}
