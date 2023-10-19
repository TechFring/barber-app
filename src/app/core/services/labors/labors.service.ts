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

  public get(filters: ILaborFilters): Observable<IPaginator<ILabor>> {
    const params = new HttpParams({ fromObject: Object.assign(filters) });
    return this._http.get<IPaginator<ILabor>>(ApiConst.ENDPOINT_LABORS, { params });
  }

  public getById(id: string): Observable<ILabor> {
    return this._http.get<ILabor>(`${ApiConst.ENDPOINT_LABORS}/${id}`);
  }

  public post(labor: ILaborFilters): Observable<ILaborFilters> {
    return this._http.post<ILaborFilters>(ApiConst.ENDPOINT_LABORS, labor);
  }

  public put(labor: ILabor): Observable<ILabor> {
    const id = labor.id;
    delete labor.id;
    return this._http.put<ILabor>(`${ApiConst.ENDPOINT_LABORS}/${id}`, labor);
  }

  public delete(id: string): Observable<void> {
    return this._http.delete<void>(`${ApiConst.ENDPOINT_LABORS}/${id}`);
  }

  public deleteMany(ids: string[]): Observable<void> {
    return this._http.delete<void>(ApiConst.ENDPOINT_LABORS, { body: { ids } });
  }
}
