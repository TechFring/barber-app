import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiConst } from '@core/constants';
import { ICustomer, ICustomerFilters, IPaginator } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  constructor(private _http: HttpClient) { }

  public get(filters: ICustomerFilters): Observable<IPaginator<ICustomer>> {
    const params = new HttpParams({ fromObject: Object.assign(filters) });
    return this._http.get<IPaginator<ICustomer>>(ApiConst.ENDPOINT_CUSTOMERS, { params });
  }

  public getById(id: string): Observable<ICustomer> {
    return this._http.get<ICustomer>(`${ApiConst.ENDPOINT_CUSTOMERS}/${id}`);
  }

  public post(customer: ICustomer): Observable<ICustomer> {
    return this._http.post<ICustomer>(ApiConst.ENDPOINT_CUSTOMERS, customer);
  }

  public put(customer: ICustomer): Observable<ICustomer> {
    const id = customer.id;
    delete customer.id;
    return this._http.put<ICustomer>(`${ApiConst.ENDPOINT_CUSTOMERS}/${id}`, customer);
  }

  public delete(id: string): Observable<void> {
    return this._http.delete<void>(`${ApiConst.ENDPOINT_CUSTOMERS}/${id}`);
  }

  public deleteMany(ids: string[]): Observable<void> {
    return this._http.delete<void>(ApiConst.ENDPOINT_CUSTOMERS, { body: { ids } });
  }
}
