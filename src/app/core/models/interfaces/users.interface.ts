import { UserLevelEnum } from '../enums/users.enum';

export interface IUserSession {
  token: string;
}

export interface IUser {
  id?: string;
  password?: string;
  level: UserLevelEnum;
  login: string;
  name: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface IUserToken extends Pick<IUser, 'login' | 'name' | 'level' > {
  sub: string;
  exp: number;
  iat: number;
}

export interface IUserFilters extends Partial<Pick<IUser, 'login' | 'name' | 'level'>> {
  page: number;
  per_page: number;
}
