export abstract class SystemConst {
  public static readonly ROUTES = {
    auth: {
      base: 'auth',
      url: '/auth'
    },
    barbers: {
      base: 'barbers',
      url: '/barbers'
    },
    users: {
      base: 'users',
      url: '/users'
    },
    schedules: {
      base: 'schedules',
      url: '/schedules'
    },
    base: {
      view: '',
      formNew: 'new',
      formEdit: ':id'
    }
  }

  public static readonly DEFAULT_ROUTE = SystemConst.ROUTES.schedules.base;
  public static readonly TITLE = 'Barber App';
}
