import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { TablePageEvent } from 'primeng/table';

import { ApiConst, PrimeNGConst } from '@core/constants';
import { ILabor, ILaborFilters } from '@core/models';
import { LaborsService } from '@core/services';
import { timeToMinutes } from '@shared/utils';

@Component({
  selector: 'app-labors-view',
  templateUrl: './labors-view.component.html',
  styleUrls: ['./labors-view.component.scss']
})
export class LaborsViewComponent implements OnInit {
  public filterForm = this._fb.group({
    name: this._fb.control(''),
    duration: this._fb.control(''),
  });
  public actions = PrimeNGConst.buildActions(() => this._activeMany(), () => this._inactiveMany());
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

  get checkedIds(): string[] {
    return this.checked.map((labor) => labor.id as string);
  }

  get filters(): ILaborFilters {
    const { name, duration } = this.filterForm.getRawValue();
    return { name, duration: duration ? timeToMinutes(duration) : duration, page: this.currentPage, per_page: this.limitPaging };
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

    console.log(this.filters)

    this._laborsService.get(this.filters).subscribe({
      next: (res) => {
        this.data = res.data;
        this.totalRecords = res.total;
      }
    }).add(() => this.loading = false);
  }

  private _activeMany(): void {
    this._laborsService.activeMany(this.checkedIds).subscribe(() => {
      this.checked = [];
      this.list();
    });
  }

  private _inactiveMany(): void {
    this._laborsService.inactiveMany(this.checkedIds).subscribe(() => {
      this.checked = [];
      this.list();
    });
  }
}
