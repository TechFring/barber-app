import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { TablePageEvent } from 'primeng/table';

import { ApiConst } from '@core/constants';
import { ICustomer, ICustomerFilters } from '@core/models';
import { CustomersService } from '@core/services';

@Component({
  templateUrl: './customers-view.component.html',
})
export class CustomersViewComponent implements OnInit {
  public filterForm = this._fb.group({
    name: this._fb.control(''),
    phone: this._fb.control(''),
    email: this._fb.control('', [Validators.email]),
  });
  public currentPage = ApiConst.DEFAULT_PAGE;
  public limitPaging = ApiConst.DEFAULT_LIMIT;
  public loading = true;
  public checked: ICustomer[] = [];
  public data!: Partial<ICustomer>[];
  public totalRecords!: number;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _customersService: CustomersService
  ) {}

  get emailControl(): FormControl {
    return this.filterForm.controls.email;
  }

  get filters(): ICustomerFilters {
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

    this._customersService.list(this.filters).subscribe({
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

    this._customersService.activeMany(checkedIds).subscribe(() => {
      this.checked = [];
      this.list();
    });
  }

  public onInactive(): void {
    const checkedIds = this.checked.filter(b => b.active).map(b => b.id as string);

    if (!checkedIds.length) {
      return;
    }

    this._customersService.inactiveMany(checkedIds).subscribe(() => {
      this.checked = [];
      this.list();
    });
  }
}
