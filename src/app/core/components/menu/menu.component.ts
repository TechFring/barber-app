import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable, filter } from 'rxjs';

import { SystemConst } from '@core/constants';
import { SidebarService } from '@core/services';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  private _menuTitle$ = new BehaviorSubject<string>('');

  constructor(
    private _title: Title,
    private _router: Router,
    private _route: ActivatedRoute,
    private _sidebarService: SidebarService,
  ) {
    this._initTitle();
  }

  get expanded$(): Observable<boolean> {
    return this._sidebarService.expanded$;
  }

  get menuTitle$(): Observable<string> {
    return this._menuTitle$.asObservable();
  }

  public toggleSidebar(): void {
    this._sidebarService.toggle();
  }

  private _initTitle(): void {
    this._router.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        let route: ActivatedRoute | null = this._route.root;

        do {
          const childrenRoutes = route.children;
          route = null;

          childrenRoutes.forEach((childRoute) => {
            if (route === null && childRoute.outlet === 'primary') {
              route = childRoute;
            }
          });

          if (route !== null) {
            const routeSnapshot = (<ActivatedRoute>route).snapshot;
            const title = routeSnapshot.data['title'];

            if (title) {
              this._menuTitle$.next(title);
              this._title.setTitle(`${SystemConst.TITLE} | ${title}`);
              break;
            }
          }
        } while (route);
      });
  }
}
