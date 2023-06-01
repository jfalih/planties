import axios from 'axios';
import {AxiosRequestConfig} from 'axios';

const request = (url?: string, options?: AxiosRequestConfig) => {
  const opt: AxiosRequestConfig = {
    url,
    method: options?.method || 'GET',
    ...options,
  };
  return axios(opt)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export default request;
