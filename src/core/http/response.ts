export interface Response<T> {
  status: string;
  data?: T;
  message?: string;
}
