import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiConst } from '@core/constants';
import { ILabor, ILaborFilters, IPaginator } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class LaborsService {
  constructor(private _http: HttpClient) { }

  public list(filters: ILaborFilters): Observable<IPaginator<ILabor>> {
    const params = new HttpParams({ fromObject: Object.assign(filters) });
    return this._http.get<IPaginator<ILabor>>(ApiConst.ENDPOINT_LABORS, { params });
  }

  public search(id: string): Observable<ILabor> {
    return this._http.get<ILabor>(`${ApiConst.ENDPOINT_LABORS}/${id}`);
  }

  public create(labor: ILabor): Observable<ILabor> {
    return this._http.post<ILabor>(ApiConst.ENDPOINT_LABORS, labor);
  }

  public update(labor: Partial<ILabor>): Observable<ILabor> {
    const id = labor.id;
    delete labor.id;
    delete labor.duration;
    return this._http.put<ILabor>(`${ApiConst.ENDPOINT_LABORS}/${id}`, labor);
  }

  public active(id: string): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_LABORS}/active/${id}`, {});
  }

  public activeMany(ids: string[]): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_LABORS}/active`, { ids });
  }

  public inactive(id: string): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_LABORS}/inactive/${id}`, {});
  }

  public inactiveMany(ids: string[]): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_LABORS}/inactive`, { ids });
  }
}
