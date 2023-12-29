import { FormControl } from '@angular/forms';

import { ILabor } from './labors.interface';
import { ICustomer } from './customers.interface';
import { IBarber } from './barbers.interface';

// Contract
export interface ISchedule {
  id?: string;
  name: string;
  barber_id: string;
  customer_id: string;

  schedule_labor?: IScheduleLabor[];
  labors?: string[];

  start_time: string;
  end_time?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IScheduleLabor {
  id: string;
  labor_id: string;
  schedule_id: string;
}

export interface IScheduleAvailable {
  available: boolean;
  suggestions: IScheduleSuggestion[];
}

export interface IScheduleSuggestion {
  start_time: string;
  end_time: string;
}

// Model
export interface IScheduleForm {
  title: FormControl<string>;
  labors: FormControl<ILabor[]>;
  barber: FormControl<IBarber | null>;
  customer: FormControl<ICustomer | null>;
  start: FormControl<Date | null>;
  end: FormControl<Date | null>;
}

export interface IScheduleData {
  title: string;
  labors: ILabor[];
  barber: IBarber;
  customer: ICustomer;
  start: Date;
  end: Date;
}
