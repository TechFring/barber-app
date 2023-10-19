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

  public list(filters: ICustomerFilters): Observable<IPaginator<ICustomer>> {
    const params = new HttpParams({ fromObject: Object.assign(filters) });
    return this._http.get<IPaginator<ICustomer>>(ApiConst.ENDPOINT_CUSTOMERS, { params });
  }

  public search(id: string): Observable<ICustomer> {
    return this._http.get<ICustomer>(`${ApiConst.ENDPOINT_CUSTOMERS}/${id}`);
  }

  public create(customer: ICustomer): Observable<ICustomer> {
    return this._http.post<ICustomer>(ApiConst.ENDPOINT_CUSTOMERS, customer);
  }

  public update(customer: ICustomer): Observable<ICustomer> {
    const id = customer.id;
    delete customer.id;
    return this._http.put<ICustomer>(`${ApiConst.ENDPOINT_CUSTOMERS}/${id}`, customer);
  }

  public active(id: string): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_CUSTOMERS}/active/${id}`, {});
  }

  public activeMany(ids: string[]): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_CUSTOMERS}/active`, { ids });
  }

  public inactive(id: string): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_CUSTOMERS}/inactive/${id}`, {});
  }

  public inactiveMany(ids: string[]): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_CUSTOMERS}/inactive`, { ids });
  }
}
