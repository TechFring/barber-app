import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ILabor } from '@core/models';
import { LaborsService } from '@core/services';
import { minutesToTime, timeToMinutes } from '@shared/utils';

@Component({
  selector: 'app-labors-form',
  templateUrl: './labors-form.component.html',
  styleUrls: ['./labors-form.component.scss']
})
export class LaborsFormComponent {
  @Input() public id?: string;

  public formGroup = this._fb.group({
    name: this._fb.control('', [Validators.required, Validators.maxLength(100)]),
    duration: this._fb.control('', [Validators.required]),
  });
  public editMode!: boolean;
  public isActive!: boolean;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _router: Router,
    private _messageService: MessageService,
    private _laborsService: LaborsService,
  ){}

  get pageTitle(): string {
    return this.editMode ? 'Editar cliente' : 'Novo cliente';
  }

  get nameControl(): FormControl {
    return this.formGroup.controls.name;
  }

  get durationControl(): FormControl {
    return this.formGroup.controls.duration;
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

    const data = this.formGroup.getRawValue();

    const labor: ILabor = {
      id: this.id,
      name: data.name,
      duration: timeToMinutes(data.duration),
    };

    const request$ = this.editMode
      ? this._laborsService.update(labor)
      : this._laborsService.create(labor);

    request$.subscribe({
      next: () => this._router.navigateByUrl('/labors'),
      error: (err: HttpErrorResponse) => this._messageService.add({ severity: 'error', detail: err.error.message })
    });
  }

  public onActive(): void {
    this._laborsService.active(this.id as string).subscribe({
      next: () => this.isActive = true,
      error: (err: HttpErrorResponse) => this._messageService.add({ severity: 'error', detail: err.error.message })
    });
  }

  public onInactive(): void {
    this._laborsService.inactive(this.id as string).subscribe({
      next: () => this.isActive = false,
      error: (err: HttpErrorResponse) => this._messageService.add({ severity: 'error', detail: err.error.message })
    });
  }

  private _loadData(): void {
    this._laborsService.search(this.id as string).subscribe({
      next: (res) => {
        this.isActive = res.active as boolean;
        this.formGroup.patchValue({
          name: res.name,
          duration: minutesToTime(res.duration)
        });
        this.durationControl.disable();
      },
      error: () => this._router.navigateByUrl('/customers')
    });
  }
}
