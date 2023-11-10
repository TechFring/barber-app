import { environment } from 'src/environments/environment';

export abstract class ApiConst {
  public static readonly HEADER_TOTAL_COUNT = 'X-Total-Count';
  public static readonly DEFAULT_PAGE = 1;
  public static readonly DEFAULT_LIMIT = 5;

  public static readonly ENDPOINT_BARBERS = `${environment.apiUrl}/barber`;
  public static readonly ENDPOINT_CUSTOMERS = `${environment.apiUrl}/customer`;
  public static readonly ENDPOINT_LABORS = `${environment.apiUrl}/labor`;
  public static readonly ENDPOINT_SCHEDULES = `${environment.apiUrl}/schedule`;
}
