export interface ICustomer {
  id?: number | string;
  name: string;
  phone: string;
  email: string;
}

export interface ICustomerParams {
  name_like?: string;
  phone_like?: string;
  email_like?: string;
  _page: number;
  _limit: number;
}
