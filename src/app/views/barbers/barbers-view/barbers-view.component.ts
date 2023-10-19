import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { TablePageEvent } from 'primeng/table';

import { IBarber, IBarberFilters } from '@core/models';
import { BarbersService } from '@core/services';
import { ApiConst } from '@core/constants';

@Component({
  selector: 'app-barbers-view',
  templateUrl: './barbers-view.component.html',
  styleUrls: ['./barbers-view.component.scss']
})
export class BarbersViewComponent implements OnInit {
  public filterForm = this._fb.group({
    name: this._fb.control(''),
    email: this._fb.control(''),
    document: this._fb.control('')
  });
  public currentPage = ApiConst.DEFAULT_PAGE;
  public limitPaging = ApiConst.DEFAULT_LIMIT;
  public loading = true;
  public checked: IBarber[] = [];
  public data!: Partial<IBarber>[];
  public totalRecords!: number;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _barbersService: BarbersService
  ) {}

  get checkedIds(): string[] {
    return this.checked.map((barber) => barber.id as string);
  }

  get filters(): IBarberFilters {
    const filters = this.filterForm.getRawValue();
    return { ...filters, page: this.currentPage, per_page: this.limitPaging };
  }

  public ngOnInit(): void {
    this.list();
  }

  public onLazyLoad(event: TablePageEvent): void {
    this.currentPage = Math.round((event.first + event.rows) / event.rows);
    this.limitPaging = event.rows;
    this.list();
  }

  public list(resetFilter = false): void {
    if (resetFilter)
      this.filterForm.reset();

    this.loading = true;
    this.data = Array.from({ length: this.limitPaging }).map(_ => new Object());

    this._barbersService.list(this.filters).subscribe({
      next: (res) => {
        this.data = res.data;
        this.totalRecords = res.total;
      }
    }).add(() => this.loading = false);
  }

  public onActive(): void {
    if (!this.checkedIds.length) return;

    this._barbersService.activeMany(this.checkedIds).subscribe(() => {
      this.checked = [];
      this.list();
    });
  }

  public onInactive(): void {
    if (!this.checkedIds.length) return;

    this._barbersService.inactiveMany(this.checkedIds).subscribe(() => {
      this.checked = [];
      this.list();
    });
  }
}
