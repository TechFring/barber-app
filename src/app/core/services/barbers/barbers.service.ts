import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, timer, switchMap } from 'rxjs';

import { ApiConst } from '@core/constants';
import { IBarber, IBarberParams, IPaginator } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class BarbersService {
  constructor(private _http: HttpClient) { }

  public get(barberParams: IBarberParams): Observable<IPaginator<IBarber>> {
    const object = JSON.parse(JSON.stringify(barberParams));
    const params = new HttpParams({ fromObject: object });
    return timer(1000).pipe(
      switchMap(() => this._http.get<IBarber[]>(ApiConst.ENDPOINT_BARBERS, { params, observe: 'response' })
        .pipe(
          map((res) => {
            const items = res.body as IBarber[];
            const total = +(res.headers.get(ApiConst.HEADER_TOTAL_COUNT) as string);
            return { items, total };
          })
        )));
  }

  public getById(barberId: string): Observable<IBarber> {
    return this._http.get<IBarber>(`${ApiConst.ENDPOINT_BARBERS}/${barberId}`);
  }

  public post(barber: IBarber): Observable<IBarber> {
    return this._http.post<IBarber>(ApiConst.ENDPOINT_BARBERS, barber);
  }

  public delete(barberIds: number[]): Observable<any> {
    const requests$ = barberIds.map((barberId) => this._http.delete<any>(`${ApiConst.ENDPOINT_BARBERS}/${barberId}`));
    return forkJoin(requests$);
  }

  public put(barber: IBarber): Observable<IBarber> {
    return this._http.put<IBarber>(`${ApiConst.ENDPOINT_BARBERS}/${barber.id}`, barber);
  }

  public patch(barberIds: number[], highlight: boolean): Observable<any> {
    const body: Partial<IBarber> = { highlight };
    const requests$ = barberIds.map((barberId) => this._http.patch<any>(`${ApiConst.ENDPOINT_BARBERS}/${barberId}`, body));
    return forkJoin(requests$);
  }
}
