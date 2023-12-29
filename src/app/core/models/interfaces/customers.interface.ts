export interface ICustomer {
  id?: string;
  name: string;
  phone: string;
  email: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ICustomerFilters extends Partial<Pick<ICustomer, 'name' | 'phone' | 'email'>> {
  page: number;
  per_page: number;
}
