import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { TablePageEvent } from 'primeng/table';
import { SelectItem } from 'primeng/api';

import { ApiConst } from '@core/constants';
import { IUser, IUserFilters, UserLevelEnum } from '@core/models';
import { UsersService } from '@core/services';

@Component({
  templateUrl: './users-view.component.html',
})
export class UsersViewComponent {
  public filterForm = this._fb.group({
    login: this._fb.control(''),
    name: this._fb.control(''),
    level: this._fb.control<SelectItem<UserLevelEnum> | ''>(''),
  });
  public currentPage = ApiConst.DEFAULT_PAGE;
  public limitPaging = ApiConst.DEFAULT_LIMIT;
  public userLevels = ApiConst.USER_LEVELS;
  public loading = true;
  public checked: IUser[] = [];
  public data!: Partial<IUser>[];
  public totalRecords!: number;

  constructor(
    private _fb: NonNullableFormBuilder,
    private _usersService: UsersService
  ) {}

  get filters(): IUserFilters {
    const { level, ...data } = this.filterForm.getRawValue();
    const filters: IUserFilters = { ...data, page: this.currentPage, per_page: this.limitPaging };

    if (level) {
      filters['level'] = level.value;
    }

    return filters;
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

    this._usersService.list(this.filters).subscribe({
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

    this._usersService.activeMany(checkedIds).subscribe(() => {
      this.checked = [];
      this.list();
    });
  }

  public onInactive(): void {
    const checkedIds = this.checked.filter(b => b.active).map(b => b.id as string);

    if (!checkedIds.length) {
      return;
    }

    this._usersService.inactiveMany(checkedIds).subscribe(() => {
      this.checked = [];
      this.list();
    });
  }

  public hasPermission(user: IUser): boolean {
    const authUser = this._usersService.authenticatedUser!;
    return authUser.sub !== user.id && authUser.level > user.level;
  }
}
