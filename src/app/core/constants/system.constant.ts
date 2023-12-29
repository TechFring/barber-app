import { UserLevelEnum } from '@core/models';

export abstract class SystemConst {
  public static readonly ROUTES = {
    schedules: {
      base: 'schedules',
      url: '/schedules',
      title: 'Agendamentos',
    },
    barbers: {
      base: 'barbers',
      url: '/barbers',
      title: 'Barbeiros',
    },
    customers: {
      base: 'customers',
      url: '/customers',
      title: 'Clientes',
    },
    labors: {
      base: 'labors',
      url: '/labors',
      title: 'Serviços',
    },
    users: {
      base: 'users',
      url: '/users',
      title: 'Usuários',
      level: UserLevelEnum.Moderator,
    },
    logs: {
      base: 'logs',
      url: '/logs',
      title: 'Logs',
      level: UserLevelEnum.Moderator,
    },
    auth: {
      base: 'auth',
      url: '/auth',
    },
    base: {
      view: '',
      formNew: 'new',
      formEdit: ':id',
    },
  };

  public static readonly DEFAULT_ROUTE = SystemConst.ROUTES.schedules.base;
  public static readonly TITLE = 'Barber App';
}
