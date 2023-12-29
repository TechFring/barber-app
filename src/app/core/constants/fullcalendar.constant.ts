import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

export const FULLCALENDAR_OPTIONS: CalendarOptions = {
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
  weekends: true,
  selectMirror: true,
  dayMaxEvents: true,
  locale: 'pt-br',
  buttonText: {
    today: 'Hoje',
    day: 'Dia',
    week: 'Semana',
    list: 'Todos'
  },
  allDayText: 'dia todo',
  timeZone: 'UTC',
  timeZoneParam: 'America/Sao_Paulo'
};
