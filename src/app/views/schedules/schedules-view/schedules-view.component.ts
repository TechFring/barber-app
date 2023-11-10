import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, DatesSetArg, EventInput } from '@fullcalendar/core';
import { EventImpl } from '@fullcalendar/core/internal';
import { Subscription, filter } from 'rxjs';

import { FULLCALENDAR_OPTIONS } from '@core/constants';
import { SchedulesDialogComponent } from '@views/schedules';
import { SchedulesService } from '@core/services';

@Component({
  selector: 'app-schedules-view',
  templateUrl: './schedules-view.component.html',
  styleUrls: ['./schedules-view.component.scss']
})
export class SchedulesViewComponent {
  @ViewChild(SchedulesDialogComponent) public schedulesDialog!: SchedulesDialogComponent;

  public schedules!: EventInput[];
  public event!: DatesSetArg;
  public subscription!: Subscription;

  public calendarOptions: CalendarOptions = {
    ...FULLCALENDAR_OPTIONS,
    eventClick: ({ event }) => this.openDialog(event),
    datesSet: (event) => this._loadData(event)
  };

  constructor(private _schedulesService: SchedulesService) {}

  public openDialog(event?: EventImpl): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.schedulesDialog.open(event)
      .pipe(filter((changed) => changed))
      .subscribe(() => this._loadData(this.event));
  }

  private _loadData(event: DatesSetArg) {
    this.event = event;
    const { startStr, endStr } = event;

    this._schedulesService.list(startStr, endStr).subscribe((res) => {
      this.schedules = res;
    });
  }
}
