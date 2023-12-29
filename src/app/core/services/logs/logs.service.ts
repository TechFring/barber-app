import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConst } from '@core/constants';
import { IPaginator } from '@core/models';
import { Observable } from 'rxjs';
import { ILog, ILogFilters } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  constructor(private _http: HttpClient) { }

  public list(filters: ILogFilters): Observable<IPaginator<ILog>> {
    const params = new HttpParams({ fromObject: Object.assign(filters) });
    return this._http.get<IPaginator<ILog>>(ApiConst.ENDPOINT_LOGS, { params });
  }
}
