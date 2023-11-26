import { Component, Input } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomersService } from '@core/services';
import { ICustomer } from '@core/models';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.scss']
})
export class CustomersFormComponent {
  @Input() public id?: string;

  public formGroup = this._fb.group({
    name: this._fb.control('', [Validators.required, Validators.maxLength(100)]),
    phone: this._fb.control('', [Validators.required]),
    email: this._fb.control('', [Validators.required, Validators.email]),
  });
  public editMode!: boolean;
  public isActive!: boolean;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _router: Router,
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
    this.editMode = !!this.id;

    if (this.editMode)
      this._loadData();
  }

  public onSave(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid)
      return;

    const customer: ICustomer = {
      id: this.id,
      ...this.formGroup.getRawValue()
    };

    const request$ = this.editMode
      ? this._customersService.update(customer)
      : this._customersService.create(customer);

    request$.subscribe(() => this._router.navigateByUrl('/customers'));
  }

  public onActive(): void {
    this._customersService.active(this.id as string).subscribe(() => this.isActive = true);
  }

  public onInactive(): void {
    this._customersService.inactive(this.id as string).subscribe(() => this.isActive = false);
  }

  private _loadData(): void {
    this._customersService.search(this.id as string).subscribe({
      next: (res) => {
        this.isActive = res.active as boolean;
        this.formGroup.patchValue(res);
      },
      error: () => this._router.navigateByUrl('/customers')
    });
  }
}
