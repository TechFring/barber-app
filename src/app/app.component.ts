import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';

import { SidebarService } from '@core/services';
import { PrimeNGConst } from '@core/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
