export interface ILog {
  id?: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface ILogFilters extends Partial<Pick<ILog, 'description' | 'created_at'>> {
  page: number;
  per_page: number;
}

