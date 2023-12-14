import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

import { UsersService } from '@core/services';
import { ApiConst } from '@core/constants';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private _userService: UsersService,
    private _messageService: MessageService
  ) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._userService.isAuthenticated) {
      const token = `Bearer ${this._userService.token}`;
      request = request.clone({ headers: request.headers.set(ApiConst.HEADER_TOKEN, token) });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 418) {
          this._userService.logout();
        }

        this._messageService.add({ severity: 'error', detail: err.error.message || 'Ocorreu um erro inesperado' });
        console.error(err);
        return throwError(() => err);
      })
    );
  }
}
