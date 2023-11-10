import { Injectable } from '@angular/core';
import { EventImpl } from '@fullcalendar/core/internal';
import { Observable, forkJoin, map, of } from 'rxjs';

import { BarbersService, CustomersService, LaborsService, SchedulesService } from '@core/services';
import { IBarber, ICustomer, ILabor, ISchedule, IScheduleAvailable, IScheduleData } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class SchedulesFacade {
  constructor(
    private _schedulesService: SchedulesService,
    private _barbersService: BarbersService,
    private _customersService: CustomersService,
    private _laborsService: LaborsService
  ) {}

  public loadDialogData(event?: EventImpl): Observable<[ISchedule, IBarber[], ICustomer[], ILabor[]]> {
    const schedule$ = event ? this._schedulesService.search(event.id) : of({} as ISchedule);
    const barbers$ = this._barbersService.list({ page: 1, per_page: 1000 });
    const customers$ = this._customersService.list({ page: 1, per_page: 1000 });
    const labors$ = this._laborsService.list({ page: 1, per_page: 1000 });

    return forkJoin([schedule$, barbers$, customers$, labors$]).pipe(
      map(([a, b, c, d]) => {
        const schedule: ISchedule = { ...a, start_time: a?.start_time?.slice(0, -1) };
        const barbers = b.data.map(barber => ({ ...barber, active: !barber.active }));
        const customers = c.data.map(customer => ({ ...customer, active: !customer.active }));
        const labors = d.data.map(labor => ({ ...labor, active: !labor.active }));

        return [schedule, barbers, customers, labors];
      })
    );
  }

  public create(data: IScheduleData): Observable<ISchedule> {
    const schedule: ISchedule = {
      customer_id: data.customer.id!,
      barber_id: data.barber.id!,
      name: data.title,
      start_time: this._dateToISOString(data.start!),
      labors: data.labors.map(l => l.id!)
    };

    return this._schedulesService.create(schedule);
  }

  public update(data: IScheduleData, id: string): Observable<ISchedule> {
    const schedule: ISchedule = {
      id,
      customer_id: data.customer?.id!,
      barber_id: data.barber?.id!,
      name: data.title,
      start_time: this._dateToISOString(data.start!),
      labors: data.labors.map(l => l.id!)
    };

    return this._schedulesService.update(schedule);
  }

  public delete(scheduleId: string): Observable<void> {
    return this._schedulesService.delete(scheduleId);
  }

  public validate(data: Partial<IScheduleData>, id?: string): Observable<IScheduleAvailable> {
    const schedule: Partial<ISchedule> = {
      id,
      barber_id: data.barber?.id,
      start_time: this._dateToISOString(data.start!),
      labors: data.labors!.map(l => l.id!)
    };

    return this._schedulesService.validate(schedule);
  }

  public formatTitle(barber: IBarber | null | undefined, labors: ILabor[] | undefined): string {
    const barberName = barber ? `${barber.name}:` : '';
    const laborsNames = labors?.map(l => l.name).join(', ');
    return `${barberName} ${laborsNames}`;
  }

  public calculateEndTime(start: Date | null | undefined, labors: ILabor[] | undefined): Date | null {
    if (!start || !labors?.length) {
      return null;
    }

    const duration = labors.reduce((a, b) => a + b.duration, 0);
    const end = new Date(start);
    end.setMinutes(start.getMinutes() + duration);
    return end;
  }

  private _dateToISOString(date: Date): string {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()
  }
}
