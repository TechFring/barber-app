import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, filter, map, startWith, timer } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SidebarService, UsersService } from '@core/services';
import { ISidebarItem } from '@core/models';
import { SystemConst } from '@core/constants';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonModule, InputTextModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @ViewChild('elInputSearch') public elInputSearch!: ElementRef<HTMLInputElement>;

  private readonly DELAY_KEY_PRESS = 300;
  private readonly DELAY_TOGGLE_SIDEBAR = 300;
  private readonly ROUTE_MATCHER = /([^?\/]+)/;
  public items$!: Observable<ISidebarItem[]>;
  public searchControl!: FormControl;
  public expanded!: boolean;
  public currentRoute!: string | null;

  constructor(
    private _router: Router,
    private _sidebarService: SidebarService,
    private _userService: UsersService,
  ) {
    this._initCurrentRoute();
    this._initExpanded();
    this._initSearchControl();
  }

  public toggleSidebar(): void {
    if (!this._sidebarService.expanded)
      this._sidebarService.toggle();

    timer(this.DELAY_TOGGLE_SIDEBAR).subscribe(() => {
      this.elInputSearch.nativeElement.focus();
    });
  }

  public logout(): void {
    this._userService.logout();
  }

  public hasPermission(item: ISidebarItem): boolean {
    if (!item.level) {
      return true;
    }

    const authUser = this._userService.authenticatedUser!;
    return authUser.level >= item.level;
  }

  private _initCurrentRoute(): void {
    const routes = this._sidebarService.searchItems('').map((i) => i.url);

    this._router.events.pipe(
        takeUntilDestroyed(),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event: any) => {
        const defaultUrl = `/${SystemConst.DEFAULT_ROUTE}`;

        try {
          const replacedUrl = `/${event.url.match(this.ROUTE_MATCHER)[1]}`;
          this.currentRoute = routes.includes(replacedUrl) ? replacedUrl : defaultUrl;
        } catch {
          this.currentRoute = defaultUrl;
        }
      });
  }

  private _initExpanded(): void {
    this._sidebarService.expanded$
      .pipe(takeUntilDestroyed())
      .subscribe((expanded) => this.expanded = expanded);
  }

  private _initSearchControl(): void {
    this.searchControl = new FormControl();
    this.items$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(this.DELAY_KEY_PRESS),
      distinctUntilChanged(),
      map((term) => this._sidebarService.searchItems(term))
    );
  }
}
