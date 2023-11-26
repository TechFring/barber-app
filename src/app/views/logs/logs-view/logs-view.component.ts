import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { TablePageEvent } from 'primeng/table';

import { ApiConst } from '@core/constants';
import { LogsService } from '@core/services';
import { ILog, ILogFilters } from '@core/models/interfaces/logs.interface';

@Component({
  selector: 'app-logs-view',
  templateUrl: './logs-view.component.html',
})
export class LogsViewComponent implements OnInit {
  public filterForm = this._fb.group({
    description: this._fb.control(''),
    created_at: this._fb.control<Date | undefined>(undefined),
  });
  public currentPage = ApiConst.DEFAULT_PAGE;
  public limitPaging = ApiConst.DEFAULT_LIMIT;
  public loading = true;
  public checked: ILog[] = [];
  public data!: Partial<ILog>[];
  public totalRecords!: number;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _logsService: LogsService
  ) {}

  get filters(): ILogFilters {
    const { description, created_at } = this.filterForm.getRawValue();
    const date = created_at?.toISOString().split('T')[0] || '';
    return { description, created_at: date, page: this.currentPage, per_page: this.limitPaging }
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

    this._logsService.list(this.filters).subscribe({
      next: (res) => {
        this.data = res.data;
        this.totalRecords = res.total;
      },
      error: () => this.data = [],
    }).add(() => this.loading = false);
  }
}
