export interface IPaginator<T> {
  current_page: number;
  data: T[];
  from: number;
  last_page: number;
  next_page: number;
  per_page: number;
  prev_page: number;
  to: number;
  total: number;
}
