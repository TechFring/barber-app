import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { EventImpl } from '@fullcalendar/core/internal';

import { BarbersService, CustomersService } from '@core/services';
import { IBarber, IBarberParams, ICustomer, ICustomerParams } from '@core/models';

@Component({
  selector: 'app-schedules-dialog',
  templateUrl: './schedules-dialog.component.html',
  styleUrls: ['./schedules-dialog.component.scss']
})
export class SchedulesDialogComponent implements OnInit {
  protected formGroup = this._fb.group({
    barber: this._fb.control<IBarber | undefined>(undefined, [Validators.required]),
    customer: this._fb.control('', [Validators.required]),
    title: this._fb.control({ value: '', disabled: true }, [Validators.required]),
    services: this._fb.control<any>([], [Validators.required]),
    date: this._fb.control<any>('', [Validators.required]),
  });
  protected visible = false;
  protected schedule!: EventImpl | undefined;
  protected scheduleId!: any;
  protected editMode!: boolean;
  protected customers!: ICustomer[];
  protected barbers!: IBarber[];
  protected services!: any[];
  protected minDate!: Date;
  protected maxDate!: Date;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _barbersService: BarbersService,
    private _customersService: CustomersService,
  ) {}

  protected get dialogHeader(): string {
    return this.editMode ? 'Editar agendamento' : 'Novo agendamento';
  }

  public ngOnInit(): void {
    const params: ICustomerParams | IBarberParams = {
      _limit: 9999,
      _page: 1
    };
    this._customersService.get(params).subscribe((res) => this.customers = res.items);
    this._barbersService.get(params).subscribe((res) => this.barbers = res.items);
    this.services = [
      { id: 1, time: '00:30', name: 'Corte de cabelo', valor: 35.00 },
      { id: 2, time: '00:30', name: 'Barba', valor: 25.00 },
    ];

    this.formGroup.valueChanges.subscribe((value) => {
      const services = value.services?.map((service: any) => service.name).join(' + ');
      const barber = value.barber?.name.concat(': ') || '';
      this.formGroup.controls.title.setValue(barber + services, { emitEvent: false });
    });

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 4 * 7);
  }

  public open(schedule?: EventImpl): void {
    this.visible = true;
    this.schedule = schedule;
    this.editMode = !!schedule;
    this._updateForm();
  }

  protected onClose(): void {
    this.formGroup.reset({
      services: []
    });
    this.visible = false;
  }

  private _updateForm(): void {
    if (!this.editMode)
      return;

    this.formGroup.patchValue({
      title: this.schedule?.title
    });
  }
}
