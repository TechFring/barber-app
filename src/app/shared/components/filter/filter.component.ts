import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, ButtonModule, PanelModule],
  template: `
    <p-panel header="Filtros" [toggleable]="true">
      <ng-content></ng-content>
      <div class="actions">
        <p-button styleClass="p-button-sm" (onClick)="onFilter.emit()">Filtrar</p-button>
        <p-button styleClass="p-button-raised p-button-text p-button-sm" (onClick)="onClear.emit()">Limpar</p-button>
      </div>
    </p-panel>
  `,
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() public onFilter = new EventEmitter<void>();
  @Output() public onClear = new EventEmitter<void>();
}
