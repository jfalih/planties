import {AxiosError, AxiosResponse} from 'axios';
import {Response} from '../../http/response';

export interface GardenBody {
  name: string;
  type: string;
  photos: string[];
}

export interface GardenResponseError {
  status: string;
  message: string;
}

export interface GardenResponse {
  garden: Garden;
}

export interface Garden {
  id: string;
  user_id: string;
  name: string;
  type: string;
  photos: any[];
}

export type GardenError = AxiosError<GardenResponseError>;
export type GardenSuccess = AxiosResponse<Response<GardenResponse>>;
