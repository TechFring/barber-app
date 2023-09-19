import { IDropdownItem } from '@core/models';
import { Confirmation, MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { LocaleSettings } from 'primeng/calendar';

export abstract class PrimeNGConst {
  public static readonly CONFIRMATION: Confirmation = {
    message: 'Tem certeza que deseja continuar?',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim',
    rejectLabel: 'Não',
  };

  public static readonly DROPDOWN_ITEMS: IDropdownItem[] = [
    { label: 'Sem filtro', value: undefined },
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ];

  public static readonly CALENDAR_LOCALE: LocaleSettings = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  public static buildActions(
    removeCommand: (event: MenuItemCommandEvent) => void,
    removeHighlightCommand?: (event: MenuItemCommandEvent) => void,
    highlightCommand?: (event: MenuItemCommandEvent) => void,
  ): MenuItem[] {
    const actions: MenuItem[] = [{ label: 'Remover', command: removeCommand }];

    if (removeHighlightCommand)
      actions.unshift({ label: 'Remover destaque', command: removeHighlightCommand })

    if (highlightCommand)
      actions.unshift({ label: 'Destacar', command: highlightCommand })

    return actions;
  }
}
