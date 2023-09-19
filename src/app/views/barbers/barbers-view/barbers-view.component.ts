import { Component, OnInit, ViewChild } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';
import { TablePageEvent } from 'primeng/table';

import { IBarber, IBarberParams, IDropdownItem } from '@core/models';
import { BarbersService } from '@core/services';
import { ApiConst, PrimeNGConst } from '@core/constants';

@Component({
  selector: 'app-barbers-view',
  templateUrl: './barbers-view.component.html',
  styleUrls: ['./barbers-view.component.scss']
})
export class BarbersViewComponent implements OnInit {
  @ViewChild(SplitButton) btnActions!: SplitButton;

  public filterForm = this._fb.group({
    name: this._fb.control(''),
    description: this._fb.control(''),
    highlight: this._fb.control<IDropdownItem | undefined>(undefined)
  });
  public actions = PrimeNGConst.buildActions(() => this._actionRemove(), () => this._actionHighlight(false), () => this._actionHighlight());
  public highlightOptions = PrimeNGConst.DROPDOWN_ITEMS;
  public currentPage = ApiConst.DEFAULT_PAGE;
  public limitPaging = ApiConst.DEFAULT_LIMIT;
  public loading = true;
  public selectedBarbers: IBarber[] = [];
  public barbers!: Partial<IBarber>[];
  public totalRecords!: number;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _confirmationService: ConfirmationService,
    private _barbersService: BarbersService
  ) {}

  get idsOfSelectedBarbers(): number[] {
    return this.selectedBarbers.map((barber) => barber.id as number);
  }

  get filterParams(): IBarberParams {
    const filters = this.filterForm.getRawValue();
    return {
      description_like: filters.description,
      highlight: filters.highlight?.value,
      name_like: filters.name,
      _page: this.currentPage,
      _limit: this.limitPaging,
    };
  }

  public ngOnInit(): void {
    this.getBarbers();
  }

  public onLazyLoad(event: TablePageEvent): void {
    this.currentPage = Math.round((event.first + event.rows) / event.rows);
    this.limitPaging = event.rows;
    this.getBarbers();
  }

  public getBarbers(resetFilter = false): void {
    if (resetFilter)
      this.filterForm.reset();

    this.loading = true;
    this.barbers = Array.from({ length: this.limitPaging }).map(_ => new Object());

    this._barbersService.get(this.filterParams).subscribe({
      next: (res) => {
        this.barbers = res.items;
        this.totalRecords = res.total;
      }
    }).add(() => this.loading = false);
  }

  private _actionRemove(): void {
    if (!this.selectedBarbers.length)
      return;

    this._confirmationService.confirm({
      ...PrimeNGConst.CONFIRMATION,
      target: this.btnActions.containerViewChild?.nativeElement,
      accept: () => this._deleteBarbers(),
    });
  }

  private _actionHighlight(highlight = true): void {
    this._barbersService.patch(this.idsOfSelectedBarbers, highlight).subscribe(() => {
      this.selectedBarbers = [];
      this.getBarbers();
    });
  }

  private _deleteBarbers(): void {
    this._barbersService.delete(this.idsOfSelectedBarbers).subscribe(() => {
      this.selectedBarbers = [];
      this.getBarbers();
    });
  }
}
