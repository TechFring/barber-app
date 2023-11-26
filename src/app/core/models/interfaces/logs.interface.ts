import { LogActionEnum } from '../enums/logs.enum';

export interface ILog {
  id?: string;
  user_id: string;
  description: string;
  action?: LogActionEnum;
  created_at?: string;
  updated_at?: string;
}

export interface ILogFilters extends Partial<Pick<ILog, 'description' | 'created_at'>> {
  page: number;
  per_page: number;
}

