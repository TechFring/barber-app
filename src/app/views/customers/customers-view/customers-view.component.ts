import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';
import { TablePageEvent } from 'primeng/table';

import { ApiConst, PrimeNGConst } from '@core/constants';
import { ICustomer, ICustomerFilters } from '@core/models';
import { CustomersService } from '@core/services';

@Component({
  selector: 'app-customers-view',
  templateUrl: './customers-view.component.html',
  styleUrls: ['./customers-view.component.scss']
})
export class CustomersViewComponent implements OnInit {
  @ViewChild(SplitButton) btnActions!: SplitButton;

  public filterForm = this._fb.group({
    name: this._fb.control(''),
    phone: this._fb.control(''),
    email: this._fb.control('', [Validators.email]),
  });
  public actions = PrimeNGConst.buildActions(() => this._activeMany(), () => this._actionRemove());
  public currentPage = ApiConst.DEFAULT_PAGE;
  public limitPaging = ApiConst.DEFAULT_LIMIT;
  public loading = true;
  public selectedCustomers: ICustomer[] = [];
  public customers!: Partial<ICustomer>[];
  public totalRecords!: number;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _confirmationService: ConfirmationService,
    private _customersService: CustomersService
  ) {}

  get emailControl(): FormControl {
    return this.filterForm.controls.email;
  }

  get idsOfSelectedCustomers(): string[] {
    return this.selectedCustomers.map((customer) => customer.id as string);
  }

  get filterParams(): ICustomerFilters {
    const filters = this.filterForm.getRawValue();
    return { ...filters, page: this.currentPage, per_page: this.limitPaging };
  }

  public ngOnInit(): void {
    this.getCustomers();
  }

  public onLazyLoad(event: TablePageEvent): void {
    this.currentPage = Math.round((event.first + event.rows) / event.rows);
    this.limitPaging = event.rows;
    this.getCustomers();
  }

  public getCustomers(resetFilter = false): void {
    if (resetFilter)
      this.filterForm.reset();

    this.loading = true;
    this.customers = Array.from({ length: this.limitPaging }).map(_ => new Object());

    this._customersService.get(this.filterParams).subscribe({
      next: (res) => {
        this.customers = res.data;
        this.totalRecords = res.total;
      }
    }).add(() => this.loading = false);
  }

  private _activeMany(): void {}

  private _actionRemove(): void {
    if (!this.selectedCustomers.length)
      return;

    this._confirmationService.confirm({
      ...PrimeNGConst.CONFIRMATION,
      target: this.btnActions.containerViewChild?.nativeElement,
      accept: () => this._deleteCustomers(),
    });
  }

  private _deleteCustomers(): void {
    this._customersService.deleteMany(this.idsOfSelectedCustomers).subscribe(() => {
      this.selectedCustomers = [];
      this.getCustomers();
    });
  }
}
