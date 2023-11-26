import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { IUser, IUserSession } from '@core/models';
import { ApiConst, StorageConst, SystemConst } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _authenticatedUser$ = new BehaviorSubject<IUser | undefined>(undefined);

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _title: Title,
  ) {}

  get authenticatedUser(): IUser | undefined {
    return this._authenticatedUser$.getValue();
  }

  get isAuthenticated(): boolean {
    try {
      const tokenExp = jwtDecode(this.token!).exp!;
      const tokenIsValid = tokenExp > (Date.now() / 1000);
      return tokenIsValid;
    } catch {
      return false;
    }
  }

  get token(): string | null {
    return localStorage.getItem(StorageConst.TOKEN_KEY);
  }

  public authenticate(login: string, password: string): Observable<IUserSession> {
    const url = `${ApiConst.ENDPOINT_USERS}/auth`;
    return this._http.post<IUserSession>(url, { login, password }).pipe(
      tap(({ user, token }) => {
        this._authenticatedUser$.next(user);
        localStorage.setItem(StorageConst.TOKEN_KEY, token);
      }),
    );
  }

  public logout(): void {
    localStorage.removeItem(StorageConst.TOKEN_KEY);
    this._authenticatedUser$.next(undefined);
    this._title.setTitle(SystemConst.TITLE);
    this._router.navigateByUrl(SystemConst.ROUTES.auth.url);
  }
}
