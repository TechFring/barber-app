export interface IBarber {
  id?: string;
  name: string;
  email: string;
  document: string;
  date_birth: string | Date;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface IBarberFilters extends Partial<Pick<IBarber, 'name' | 'email' | 'document'>> {
  page: number;
  per_page: number;
}
