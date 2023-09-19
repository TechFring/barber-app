import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { IBarber, IUploadEvent } from '@core/models';
import { BarbersService } from '@core/services';
import { PrimeNGConst } from '@core/constants';

@Component({
  selector: 'app-barbers-form',
  templateUrl: './barbers-form.component.html',
  styleUrls: ['./barbers-form.component.scss']
})
export class BarbersFormComponent implements OnInit {
  @Input() public barberId?: string;

  public formGroup = this._fb.group({
    name: this._fb.control('', [Validators.required, Validators.maxLength(100)]),
    dateBirth: this._fb.control<any>('', [Validators.required]),
    description: this._fb.control('', [Validators.maxLength(255)]),
    highlight: this._fb.control(false),
  });
  public uploadedPhoto!: File | undefined;
  public editMode!: boolean;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _barbersService: BarbersService,
  ) {}

  get pageTitle(): string {
    return this.editMode ? 'Editar barbeiro' : 'Novo barbeiro';
  }

  get nameControl(): FormControl {
    return this.formGroup.controls.name;
  }

  get descriptionControl(): FormControl {
    return this.formGroup.controls.description;
  }

  public ngOnInit(): void {
    this.editMode = !!this.barberId;

    if (this.editMode)
      this._searchBarberAndUpdateForm();
  }

  public onSelectPhoto(event: IUploadEvent): void {
    if (event.currentFiles.length)
      this.uploadedPhoto = event.currentFiles[0] as File;
  }

  public onRemovePhoto(): void {
    this.uploadedPhoto = undefined;
  }

  public onSave(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid)
      return;

    const barber: IBarber = {
      id: this.barberId,
      ...this.formGroup.getRawValue()
    };

    const request$ = this.editMode
      ? this._barbersService.put(barber)
      : this._barbersService.post(barber);

    request$.subscribe(() => this._router.navigateByUrl('/barbers'));
  }

  public onRemove(event: Event): void {
    this._confirmationService.confirm({
      ...PrimeNGConst.CONFIRMATION,
      target: event.target as EventTarget,
      accept: () => this._deleteBarber()
    });
  }

  private _searchBarberAndUpdateForm(): void {
    this._barbersService.getById(this.barberId as string).subscribe((res) => {
      this.formGroup.patchValue({ ...res, dateBirth: new Date(res.dateBirth) });
    });
  }

  private _deleteBarber(): void {
    const barbersIds = [+(<string>this.barberId)];
    this._barbersService.delete(barbersIds).subscribe(() => this._router.navigateByUrl('/barbers'));
  }
}
