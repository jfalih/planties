import {AxiosError, AxiosResponse} from 'axios';
import {Response} from '../../http/response';

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponseError {
  status: string;
  message: string;
}
export type LoginSuccess = AxiosResponse<Response<LoginResponse>>;
export type AuthError = AxiosError<AuthResponseError>;

export interface RegisterBody {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  addedUser: AddedUser;
}

export interface AddedUser {
  id: string;
  oxygen_id: string;
  email: string;
  name: string;
}

export type RegisterSuccess = AxiosResponse<Response<RegisterResponse>>;
