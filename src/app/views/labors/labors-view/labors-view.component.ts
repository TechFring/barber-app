import { Component, OnInit, ViewChild } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';
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
  @ViewChild(SplitButton) btnActions!: SplitButton;

  public filterForm = this._fb.group({
    name: this._fb.control(''),
    duration: this._fb.control(''),
  });
  public actions = PrimeNGConst.buildActions(() => this._activeMany(), () => this._actionRemove());
  public highlightOptions = PrimeNGConst.DROPDOWN_ITEMS;
  public currentPage = ApiConst.DEFAULT_PAGE;
  public limitPaging = ApiConst.DEFAULT_LIMIT;
  public loading = true;
  public selectedLabors: ILabor[] = [];
  public labors!: Partial<ILabor>[];
  public totalRecords!: number;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _confirmationService: ConfirmationService,
    private _laborsService: LaborsService
  ) {}

  get idsOfSelectedLabors(): string[] {
    return this.selectedLabors.map((labor) => labor.id as string);
  }

  get filters(): ILaborFilters {
    const { name, duration } = this.filterForm.getRawValue();
    return { name, duration: duration ? timeToMinutes(duration) : duration, page: this.currentPage, per_page: this.limitPaging };
  }

  public ngOnInit(): void {
    this.getLabors();
  }

  public onLazyLoad(event: TablePageEvent): void {
    this.currentPage = Math.round((event.first + event.rows) / event.rows);
    this.limitPaging = event.rows;
    this.getLabors();
  }

  public getLabors(resetFilter = false): void {
    if (resetFilter)
      this.filterForm.reset();

    this.loading = true;
    this.labors = Array.from({ length: this.limitPaging }).map(_ => new Object());

    console.log(this.filters)

    this._laborsService.get(this.filters).subscribe({
      next: (res) => {
        this.labors = res.data;
        this.totalRecords = res.total;
      }
    }).add(() => this.loading = false);
  }

  private _activeMany(): void {}

  private _actionRemove(): void {
    if (!this.selectedLabors.length)
      return;

    this._confirmationService.confirm({
      ...PrimeNGConst.CONFIRMATION,
      target: this.btnActions.containerViewChild?.nativeElement,
      accept: () => this._deleteLabors(),
    });
  }

  private _deleteLabors(): void {
    this._laborsService.deleteMany(this.idsOfSelectedLabors).subscribe(() => {
      this.selectedLabors = [];
      this.getLabors();
    });
  }
}
