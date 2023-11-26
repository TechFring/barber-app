import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';

import { SidebarService } from '@core/services';
import { PrimeNGConst } from '@core/constants';
import { MenuComponent, SidebarComponent } from '@core/components';

@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet, SidebarComponent, MenuComponent],
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {
  constructor(
    private _primeNGConfig: PrimeNGConfig,
    private _sidebarService: SidebarService
  ) {}

  get expanded$(): Observable<boolean> {
    return this._sidebarService.expanded$;
  }

  public ngOnInit(): void {
    this._primeNGConfig.setTranslation({
      ...PrimeNGConst.CALENDAR_LOCALE
    });
  }
}
