import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Tag } from 'primeng/tag';

@Directive({
  selector: '[appRegisterStatus]',
  standalone: true,
})
export class RegisterStatusDirective implements OnInit {
  @Input('appRegisterStatus') public isActive!: boolean;

  private readonly ACTIVE = { label: 'Ativo', severity: 'success' };
  private readonly INACTIVE = { label: 'Inativo', severity: 'danger' };

  constructor(private _viewContainerRef: ViewContainerRef) {}

  public ngOnInit(): void {
    const tag = this._viewContainerRef.createComponent(Tag);
    const config = this.isActive ? this.ACTIVE : this.INACTIVE;
    tag.instance.value = config.label;
    tag.instance.severity = config.severity;
  }
}
