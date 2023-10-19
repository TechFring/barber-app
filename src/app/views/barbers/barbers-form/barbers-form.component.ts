import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { IBarber } from '@core/models';
import { BarbersService } from '@core/services';

@Component({
  selector: 'app-barbers-form',
  templateUrl: './barbers-form.component.html',
  styleUrls: ['./barbers-form.component.scss']
})
export class BarbersFormComponent implements OnInit {
  @Input() public id?: string;

  public formGroup = this._fb.group({
    name: this._fb.control('', [Validators.required, Validators.maxLength(100)]),
    email: this._fb.control('', [Validators.required, Validators.email]),
    document: this._fb.control('', [Validators.required]),
    date_birth: this._fb.control<Date | string>('', [Validators.required]),
  });
  public editMode!: boolean;
  public isActive!: boolean;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _router: Router,
    private _messageService: MessageService,
    private _barbersService: BarbersService,
  ) {}

  get pageTitle(): string {
    return this.editMode ? 'Editar barbeiro' : 'Novo barbeiro';
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

    const barber: IBarber = {
      id: this.id,
      ...this.formGroup.getRawValue()
    };

    const request$ = this.editMode
      ? this._barbersService.update(barber)
      : this._barbersService.create(barber);

    request$.subscribe({
      next: () => this._router.navigateByUrl('/barbers'),
      error: (err: HttpErrorResponse) => this._messageService.add({ severity: 'error', detail: err.error.message })
    });
  }

  public onActive(): void {
    this._barbersService.active(this.id as string).subscribe({
      next: () => this.isActive = true,
      error: (err: HttpErrorResponse) => this._messageService.add({ severity: 'error', detail: err.error.message })
    });
  }

  public onInactive(): void {
    this._barbersService.inactive(this.id as string).subscribe({
      next: () => this.isActive = false,
      error: (err: HttpErrorResponse) => this._messageService.add({ severity: 'error', detail: err.error.message })
    });
  }

  private _loadData(): void {
    this._barbersService.search(this.id as string).subscribe({
      next: (res) => {
        const date = new Date(res.date_birth);
        this.isActive = res.active as boolean;
        date.setDate(date.getDate() + 1);
        this.formGroup.patchValue({ ...res, date_birth: date });
      },
      error: () => this._router.navigateByUrl('/barbers')
    });
  }
}
