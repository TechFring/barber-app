import { environment } from 'src/environments/environment';

export abstract class ApiConst {
  public static readonly DEFAULT_PAGE = 1;
  public static readonly DEFAULT_LIMIT = 5;

  public static readonly HEADER_TOKEN = 'Authorization';

  public static readonly ENDPOINT_BARBERS = `${environment.apiUrl}/barber`;
  public static readonly ENDPOINT_CUSTOMERS = `${environment.apiUrl}/customer`;
  public static readonly ENDPOINT_LABORS = `${environment.apiUrl}/labor`;
  public static readonly ENDPOINT_SCHEDULES = `${environment.apiUrl}/schedule`;
  public static readonly ENDPOINT_USERS = `${environment.apiUrl}/user`;
  public static readonly ENDPOINT_LOGS = `${environment.apiUrl}/log`;
}
