import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { IPaginator, IUser, IUserToken, IUserFilters, IUserSession } from '@core/models';
import { ApiConst, StorageConst, SystemConst } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _authenticatedUser$ = new BehaviorSubject<IUserToken | undefined>(undefined);

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _title: Title,
  ) {
    this.refreshProfile();
  }

  get authenticatedUser(): IUserToken | undefined {
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

  set token(token: string) {
    localStorage.setItem(StorageConst.TOKEN_KEY, token);
  }

  public authenticate(login: string, password: string): Observable<IUserSession> {
    const url = `${ApiConst.ENDPOINT_USERS}/auth`;
    return this._http.post<IUserSession>(url, { login, password }).pipe(
      tap(({ token }) => {
        const authUser = jwtDecode<IUserToken>(token);
        this._authenticatedUser$.next(authUser);
        this.token = token;
      }),
    );
  }

  public refreshProfile(): void {
    if (this.token && !this.authenticatedUser) {
      const authUser = jwtDecode<IUserToken>(this.token!);
      this._authenticatedUser$.next(authUser);
    }
  }

  public list(filters: IUserFilters): Observable<IPaginator<IUser>> {
    const params = new HttpParams({ fromObject: Object.assign(filters) });
    return this._http.get<IPaginator<IUser>>(ApiConst.ENDPOINT_USERS, { params });
  }

  public search(id: string): Observable<IUser> {
    return this._http.get<IUser>(`${ApiConst.ENDPOINT_USERS}/${id}`);
  }

  public create(user: IUser): Observable<IUser> {
    return this._http.post<IUser>(ApiConst.ENDPOINT_USERS, user);
  }

  public update(user: Partial<IUser>): Observable<IUser> {
    const id = user.id;
    delete user.id;
    return this._http.put<IUser>(`${ApiConst.ENDPOINT_USERS}/${id}`, user);
  }

  public active(id: string): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_USERS}/active/${id}`, {});
  }

  public activeMany(ids: string[]): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_USERS}/active`, { ids });
  }

  public inactive(id: string): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_USERS}/inactive/${id}`, {});
  }

  public inactiveMany(ids: string[]): Observable<void> {
    return this._http.patch<void>(`${ApiConst.ENDPOINT_USERS}/inactive`, { ids });
  }

  public logout(): void {
    localStorage.removeItem(StorageConst.TOKEN_KEY);
    this._authenticatedUser$.next({} as unknown as IUserToken);
    this._title.setTitle(SystemConst.TITLE);
    this._router.navigateByUrl(SystemConst.ROUTES.auth.url);
  }
}
