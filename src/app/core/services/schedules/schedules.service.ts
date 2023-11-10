import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { Observable, map } from 'rxjs';

import { ISchedule, IScheduleAvailable } from '@core/models';
import { ApiConst } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  constructor(private _http: HttpClient) {}

  public list(startTime: string, endTime: string): Observable<EventInput[]> {
    const params = new HttpParams({ fromObject: { start_time: startTime, end_time: endTime } });

    return this._http.get<ISchedule[]>(ApiConst.ENDPOINT_SCHEDULES, { params }).pipe(
      map((res) => {
        return res.map((schedule): EventInput => ({
          id: schedule.id,
          title: schedule.name,
          start: schedule.start_time,
          end: schedule.end_time,
          extendedProps: {
            barberId: schedule.barber_id,
            customerId: schedule.customer_id,
            laborsIds: schedule.schedule_labor!.map(s => s.labor_id)
          }
        }));
      })
    );
  }

  public search(id: string): Observable<ISchedule> {
    return this._http.get<ISchedule>(`${ApiConst.ENDPOINT_SCHEDULES}/${id}`);
  }

  public create(schedule: ISchedule): Observable<ISchedule> {
    return this._http.post<ISchedule>(ApiConst.ENDPOINT_SCHEDULES, schedule);
  }

  public update(schedule: ISchedule): Observable<ISchedule> {
    const id = schedule.id;
    delete schedule.id;
    return this._http.put<ISchedule>(`${ApiConst.ENDPOINT_SCHEDULES}/${id}`, schedule);
  }

  public delete(scheduleId: string): Observable<void> {
    return this._http.delete<void>(`${ApiConst.ENDPOINT_SCHEDULES}/${scheduleId}`);
  }

  public validate(schedule: Partial<ISchedule>): Observable<IScheduleAvailable> {
    return this._http.post<IScheduleAvailable>(`${ApiConst.ENDPOINT_SCHEDULES}/validate`, schedule).pipe(
      map((res) => {
        const suggestions = res.suggestions
          .slice(0, 9)
          .map(s => ({ ...s, start_time: s.start_time.slice(0, -1), end_time: s.end_time.slice(0, -1) }));

        return { ...res, suggestions };
      })
    );
  }
}
