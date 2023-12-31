import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { TablePageEvent } from 'primeng/table';

import { ApiConst } from '@core/constants';
import { ILabor, ILaborFilters } from '@core/models';
import { LaborsService } from '@core/services';
import { timeToMinutes } from '@shared/utils';

@Component({
  templateUrl: './labors-view.component.html',
})
export class LaborsViewComponent implements OnInit {
  public filterForm = this._fb.group({
    name: this._fb.control(''),
    duration: this._fb.control(''),
  });
  public currentPage = ApiConst.DEFAULT_PAGE;
  public limitPaging = ApiConst.DEFAULT_LIMIT;
  public loading = true;
  public checked: ILabor[] = [];
  public data!: Partial<ILabor>[];
  public totalRecords!: number;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _laborsService: LaborsService
  ) {}

  get filters(): ILaborFilters {
    const { name, duration } = this.filterForm.getRawValue();
    return { name, duration: timeToMinutes(duration), page: this.currentPage, per_page: this.limitPaging };
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

    this._laborsService.list(this.filters).subscribe({
      next: (res) => {
        this.data = res.data;
        this.totalRecords = res.total;
      },
      error: () => this.data = [],
    }).add(() => this.loading = false);
  }

  public onActive(): void {
    const checkedIds = this.checked.filter(b => !b.active).map(b => b.id as string);

    if (!checkedIds.length) {
      return;
    }

    this._laborsService.activeMany(checkedIds).subscribe(() => {
      this.checked = [];
      this.list();
    });
  }

  public onInactive(): void {
    const checkedIds = this.checked.filter(b => b.active).map(b => b.id as string);

    if (!checkedIds.length) {
      return;
    }

    this._laborsService.inactiveMany(checkedIds).subscribe(() => {
      this.checked = [];
      this.list();
    });
  }
}
