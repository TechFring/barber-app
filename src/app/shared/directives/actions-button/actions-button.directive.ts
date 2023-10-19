import { Directive, EventEmitter, OnInit, Output, ViewContainerRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';

@Directive({
  selector: '[appActionsButton]',
  standalone: true,
})
export class ActionsButtonDirective implements OnInit {
  @Output() public onInactive = new EventEmitter<void>();
  @Output() public onActive = new EventEmitter<void>();

  private readonly CONFIG = {
    label: 'Ações',
    styleClass: 'p-button-raised p-button-text',
    model: [
      {
        label: 'Ativar',
        command: () => this.onActive.emit(),
      },
      {
        label: 'Inativar',
        command: () => this.onInactive.emit(),
      },
    ] as MenuItem[]
  };

  constructor(private _viewContainerRef: ViewContainerRef) {}

  public ngOnInit(): void {
    const button = this._viewContainerRef.createComponent(SplitButton);
    button.instance.label =  this.CONFIG.label;
    button.instance.styleClass = this.CONFIG.styleClass;
    button.instance.model = this.CONFIG.model;
  }
}
