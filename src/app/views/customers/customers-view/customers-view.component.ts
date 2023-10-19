import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { TablePageEvent } from 'primeng/table';

import { ApiConst } from '@core/constants';
import { ICustomer, ICustomerFilters } from '@core/models';
import { CustomersService } from '@core/services';

@Component({
  selector: 'app-customers-view',
  templateUrl: './customers-view.component.html',
  styleUrls: ['./customers-view.component.scss']
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

  get checkedIds(): string[] {
    return this.checked.map((customer) => customer.id as string);
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
      }
    }).add(() => this.loading = false);
  }

  public onActive(): void {
    if (!this.checkedIds.length) return;

    this._customersService.activeMany(this.checkedIds).subscribe(() => {
      this.checked = [];
      this.list();
    });
  }

  public onInactive(): void {
    if (!this.checkedIds.length) return;

    this._customersService.inactiveMany(this.checkedIds).subscribe(() => {
      this.checked = [];
      this.list();
    });
  }
}
