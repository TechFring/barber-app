import { PrimeIcons } from 'primeng/api';
import { UserLevelEnum } from '../enums/users.enum';

export interface ISidebarItem {
  label: string;
  icon: PrimeIcons;
  url: string,
  level?: UserLevelEnum
}
