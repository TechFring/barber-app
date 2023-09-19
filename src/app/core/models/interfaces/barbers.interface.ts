export interface IBarber {
  id?: number | string;
  name: string;
  dateBirth: string;
  description: string;
  highlight: boolean
}

export interface IBarberParams {
  name_like?: string;
  description_like?: string;
  highlight?: boolean;
  _page: number;
  _limit: number;
}
