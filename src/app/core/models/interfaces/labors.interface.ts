export interface ILabor {
  id?: string;
  name: string;
  duration: number;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ILaborFilters extends Partial<Pick<ILabor, 'name' | 'duration'>> {
  page: number;
  per_page: number;
}
