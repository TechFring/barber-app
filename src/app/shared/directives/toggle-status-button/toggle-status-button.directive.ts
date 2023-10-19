import { ComponentRef, Directive, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewContainerRef } from '@angular/core';
import { Button } from 'primeng/button';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appToggleStatusButton]',
  standalone: true,
})
export class ToggleStatusButtonDirective implements OnChanges, OnDestroy {
  @Input('appToggleStatusButton') public isActive!: boolean;
  @Output() public onInactive = new EventEmitter<MouseEvent>();
  @Output() public onActive = new EventEmitter<MouseEvent>();

  private readonly ACTIVE = {
    label: 'Ativar',
    styleClass: 'p-button-success p-button-raised p-button-text p-button-sm',
    event: () => this.onActive.emit(),
  };

  private readonly INACTIVE = {
    label: 'Inativar',
    styleClass: 'p-button-danger p-button-raised p-button-text p-button-sm',
    event: () => this.onInactive.emit(),
  };

  private _button!: ComponentRef<Button>;
  private _subscription!: Subscription;

  constructor(private _viewContainerRef: ViewContainerRef) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isActive'].currentValue === undefined)
      return;

    this._renderButton();
  }

  public ngOnDestroy(): void {
    this._clearState();
  }

  private _renderButton(): void {
    this._clearState();

    const config = this.isActive ? this.INACTIVE : this.ACTIVE;
    this._button = this._viewContainerRef.createComponent(Button);
    this._subscription = this._button.instance.onClick.subscribe(() => config.event());
    this._button.instance.label = config.label;
    this._button.instance.styleClass = config.styleClass;
  }

  private _clearState(): void {
    this._subscription?.unsubscribe();
    this._button?.destroy();
  }
}
