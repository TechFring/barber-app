import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiConst } from '@core/constants';
import { IBarber, IBarberFilters, IPaginator } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class BarbersService {
  constructor(private _http: HttpClient) { }

  public list(filters: IBarberFilters): Observable<IPaginator<IBarber>> {
    const params = new HttpParams({ fromObject: Object.assign(filters) });
    return this._http.get<IPaginator<IBarber>>(ApiConst.ENDPOINT_BARBERS, { params });
  }

  public search(id: string): Observable<IBarber> {
    return this._http.get<IBarber>(`${ApiConst.ENDPOINT_BARBERS}/${id}`);
  }

  public create(barber: IBarber): Observable<IBarber> {
    return this._http.post<IBarber>(ApiConst.ENDPOINT_BARBERS, barber);
  }

  public update(barber: IBarber): Observable<IBarber> {
    const id = barber.id;
    delete barber.id;
    return this._http.put<IBarber>(`${ApiConst.ENDPOINT_BARBERS}/${id}`, barber);
  }

  public active(id: string): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_BARBERS}/active/${id}`, {});
  }

  public activeMany(ids: string[]): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_BARBERS}/active`, { ids });
  }

  public inactive(id: string): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_BARBERS}/inactive/${id}`, {});
  }

  public inactiveMany(ids: string[]): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_BARBERS}/inactive`, { ids });
  }
}
