import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '@core/services';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  public formGroup = this._fb.group({
    login: this._fb.control<string>('', [Validators.required]),
    password: this._fb.control<string>('', [Validators.required]),
  });

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: UsersService
  ) {}

  public onSubmit(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    const { login, password } = this.formGroup.getRawValue();

    this._userService.authenticate(login!, password!).subscribe(() => this._router.navigateByUrl('/'));
  }
}
