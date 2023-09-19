import { Injectable } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly ITEMS: MenuItem[] = [
    { label: 'Agendamentos', icon: PrimeIcons.CALENDAR, url: '/schedules' },
    { label: 'Barbeiros', icon: PrimeIcons.ID_CARD, url: '/barbers' },
    { label: 'Clientes', icon: PrimeIcons.USER, url: '/customers' },
    { label: 'Logs', icon: PrimeIcons.DATABASE, url: '/logs' },
    { label: 'Serviços', icon: PrimeIcons.BOX, url: '/services' },
  ];
  private _expanded$ = new BehaviorSubject<boolean>(true);

  constructor() { }

  get expanded(): boolean {
    return this._expanded$.getValue();
  }

  get expanded$(): Observable<boolean> {
    return this._expanded$.asObservable();
  }

  public searchItems(term: string): MenuItem[] {
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
