export interface ICustomer {
  id?: number | string;
  name: string;
  phone: string;
  email: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ICustomerFilters extends Pick<ICustomer, 'name' | 'phone' | 'email' | 'active'> {
  page: number;
  per_page: number;
}
