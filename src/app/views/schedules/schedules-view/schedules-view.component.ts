import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/core';

import { SchedulesDialogComponent } from '@views/schedules';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  }
];

export function createEventId() {
  return String(eventGuid++);
}

@Component({
  selector: 'app-schedules-view',
  templateUrl: './schedules-view.component.html',
  styleUrls: ['./schedules-view.component.scss']
})
export class SchedulesViewComponent {
  @ViewChild(SchedulesDialogComponent) public schedulesDialog!: SchedulesDialogComponent;

  public calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [
      interactionPlugin,
      listPlugin,
      timeGridPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay listWeek'
    },
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    // editable: true,
    // selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: (event) => this.onClickEvent(event),
    locale: 'pt-br',
    buttonText: {
      today: 'Hoje',
      day: 'Dia',
      week: 'Semana',
      list: 'Todos'
    } as any,
    allDayText: 'dia todo'
  };

  constructor(private changeDetector: ChangeDetectorRef) {}

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }

  onClickEvent({ event }: EventClickArg) {
    this.schedulesDialog.open(event);
  }
}
