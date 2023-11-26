export interface IUserSession {
  token: string;
  user: IUser;
}

export interface IUser {
  id: string;
  admin: boolean;
  login: string;
  name: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}
