import { Confirmation } from 'primeng/api';
import { LocaleSettings } from 'primeng/calendar';

export abstract class PrimeNGConst {
  public static readonly CONFIRMATION: Confirmation = {
    message: 'Tem certeza que deseja continuar?',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim',
    rejectLabel: 'Não',
  };

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
}
