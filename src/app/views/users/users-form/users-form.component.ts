import { Component, Input } from '@angular/core';
import { Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiConst, SystemConst } from '@core/constants';
import { IUser, UserLevelEnum } from '@core/models';
import { UsersService } from '@core/services';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent {
  @Input() public id?: string;

  public formGroup = this._fb.group({
    name: this._fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
    login: this._fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^\S+$/)]),
    password: this._fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    confirm: this._fb.control('', [Validators.required]),
    level: this._fb.control<SelectItem<UserLevelEnum> | ''>('', [Validators.required]),
  });
  public editMode!: boolean;
  public isActive!: boolean;
  public userLevels!: SelectItem<'' | UserLevelEnum>[];

  constructor(
    private _fb: NonNullableFormBuilder,
    private _router: Router,
    private _usersService: UsersService,
  ){}

  get pageTitle(): string {
    return this.editMode ? 'Editar usuário' : 'Novo usuário';
  }

  get nameControl(): FormControl {
    return this.formGroup.controls.name;
  }

  get loginControl(): FormControl {
    return this.formGroup.controls.login;
  }

  get passwordControl(): FormControl {
    return this.formGroup.controls.password;
  }

  get confirmControl(): FormControl {
    return this.formGroup.controls.confirm;
  }

  get levelControl(): FormControl {
    return this.formGroup.controls.level;
  }

  public ngOnInit(): void {
    this.editMode = !!this.id;

    this._initLevels();

    if (this.editMode) {
      this._loadData();
    }
  }

  public onInput(): void {
    if (!this.confirmControl.value) {
      return;
    }

    if (this.confirmControl.value !== this.passwordControl.value) {
      this.confirmControl.setErrors({ matcher: true });
    }
  }

  public onSave(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    const data = this.formGroup.getRawValue();

    const user: IUser = {
      id: this.id,
      name: data.name,
      login: data.login,
      password: data.password,
      level: (this.levelControl.value as SelectItem<UserLevelEnum>).value,
    }

    const request$ = this.editMode
      ? this._usersService.update(user)
      : this._usersService.create(user);

    request$.subscribe(() => this._router.navigateByUrl(SystemConst.ROUTES.users.url));
  }

  public onActive(): void {
    this._usersService.active(this.id as string).subscribe(() => this.isActive = true);
  }

  public onInactive(): void {
    this._usersService.inactive(this.id as string).subscribe(() => this.isActive = false);
  }

  public hasPermission(validateId = false): boolean {
    const userLevel = (this.levelControl.value as SelectItem<UserLevelEnum>).value;
    const authUser = this._usersService.authenticatedUser!;

    if (!this.editMode) {
      return true;
    }

    if (validateId) {
      return this.id !== authUser.sub && authUser.level >= userLevel;
    }

    return authUser.level >= userLevel;
  }

  private _loadData(): void {
    this._usersService.search(this.id as string).subscribe({
      next: (res) => {
        this.isActive = res.active as boolean;

        this.formGroup.patchValue({
          name: res.name,
          login: res.login,
          level: this.userLevels.find(({ value }) => res.level === value) as SelectItem<UserLevelEnum>,
        });

        this._configForm();
      },
      error: () => this._router.navigateByUrl(SystemConst.ROUTES.users.url)
    });
  }

  private _configForm(): void {
    this.confirmControl.removeValidators([Validators.required]);
    this.confirmControl.updateValueAndValidity();

    this.passwordControl.removeValidators([Validators.required]);
    this.passwordControl.updateValueAndValidity();

    if (this.hasPermission()) {
      this.loginControl.disable();
      this.levelControl.disable();
    } else {
      this.formGroup.disable();
    }
  }

  private _initLevels(): void {
    const authUser = this._usersService.authenticatedUser;

    this.userLevels = ApiConst.USER_LEVELS.map((level) => ({
      ...level,
      disabled: level.disabled || (level.value !== '' && level.value > authUser!.level)
    }));
  }
}
