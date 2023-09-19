import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { SidebarService } from '@core/services';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(private _sidebarService: SidebarService) {}

  get expanded$(): Observable<boolean> {
    return this._sidebarService.expanded$;
  }

  public toggleSidebar(): void {
    this._sidebarService.toggle();
  }
}
