import { Injectable } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

import { ISidebarItem, UserLevelEnum } from '@core/models';
import { SystemConst } from '@core/constants';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly ITEMS: ISidebarItem[] = [
    { label: SystemConst.ROUTES.schedules.title, icon: PrimeIcons.CALENDAR, url: SystemConst.ROUTES.schedules.url },
    { label: SystemConst.ROUTES.barbers.title, icon: PrimeIcons.ID_CARD, url: SystemConst.ROUTES.barbers.url },
    { label: SystemConst.ROUTES.customers.title, icon: PrimeIcons.USER, url: SystemConst.ROUTES.customers.url },
    { label: SystemConst.ROUTES.labors.title, icon: PrimeIcons.BOX, url: SystemConst.ROUTES.labors.url },
    { label: SystemConst.ROUTES.users.title, icon: PrimeIcons.USERS, url: SystemConst.ROUTES.users.url, level: SystemConst.ROUTES.users.level },
    { label: SystemConst.ROUTES.logs.title, icon: PrimeIcons.DATABASE, url: SystemConst.ROUTES.logs.url, level: SystemConst.ROUTES.logs.level },
  ];
  private _expanded$ = new BehaviorSubject<boolean>(true);

  constructor() { }

  get expanded(): boolean {
    return this._expanded$.getValue();
  }

  get expanded$(): Observable<boolean> {
    return this._expanded$.asObservable();
  }

  public searchItems(term: string): ISidebarItem[] {
    term = this._adjustSearchItem(term);
    return this.ITEMS.filter(({ label }) => (this._adjustSearchItem(label as string)).includes(term));
  }

  public toggle(): void {
    this._expanded$.next(!this.expanded);
  }

  private _adjustSearchItem(term: string): string {
    return term.trim().toLocaleLowerCase();
  }
}
