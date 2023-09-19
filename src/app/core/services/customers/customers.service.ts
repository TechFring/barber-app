import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, timer, switchMap } from 'rxjs';

import { ApiConst } from '@core/constants';
import { ICustomer, ICustomerParams, IPaginator } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  constructor(private _http: HttpClient) { }

  public get(customerParams?: ICustomerParams): Observable<IPaginator<ICustomer>> {
    const object = JSON.parse(JSON.stringify(customerParams));
    const params = new HttpParams({ fromObject: object });

    return timer(1000).pipe(
      switchMap(() => this._http.get<ICustomer[]>(ApiConst.ENDPOINT_CUSTOMERS, { params, observe: 'response' })
        .pipe(
          map((res) => {
            const items = res.body as ICustomer[];
            const total = +(res.headers.get(ApiConst.HEADER_TOTAL_COUNT) as string);
            return { items, total };
          })
        )));
  }

  public getById(customerId: string): Observable<ICustomer> {
    return this._http.get<ICustomer>(`${ApiConst.ENDPOINT_CUSTOMERS}/${customerId}`);
  }

  public delete(customerIds: number[]): Observable<any> {
    const requests$ = customerIds.map((customerId) => this._http.delete<any>(`${ApiConst.ENDPOINT_CUSTOMERS}/${customerId}`));
    return forkJoin(requests$);
  }

  public post(customer: ICustomer): Observable<ICustomer> {
    return this._http.post<ICustomer>(ApiConst.ENDPOINT_CUSTOMERS, customer);
  }

  public put(customer: ICustomer): Observable<ICustomer> {
    return this._http.put<ICustomer>(`${ApiConst.ENDPOINT_CUSTOMERS}/${customer.id}`, customer);
  }
}
