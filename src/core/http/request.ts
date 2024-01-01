import axios, {AxiosRequestConfig} from 'axios';
import {sessionStorage} from '../../core/storage';
import Config from 'react-native-config';

const baseRequest = axios.create({
  withCredentials: true,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ** Only if using authorization
baseRequest.interceptors.request.use(
  async res => {
    const authToken = sessionStorage.getString(Config.AUTH_TOKEN_KEY);
    if (authToken) {
      res.headers.Authorization = `Bearer ${authToken}`;
    }
    return res;
  },
  async err => {
    return Promise.reject(err);
  },
);

baseRequest.interceptors.response.use(
  response => {
    return response; // <- I want to trigger this callback
  },
  error => {
    // <- so far i can only trigger a response error
    if (error.response) {
      if (__DEV__) {
        console.log('=========== ERROR ===========');
        console.log('Config', error.config.url);
        console.log('Data', error.response.data);
        console.log('Status', error.response.status);
      }
    }

    return Promise.reject(error);
  },
);
const request = (url?: string, options?: AxiosRequestConfig) => {
  const config: AxiosRequestConfig = {
    url,
    method: options?.method || 'GET',
    ...options,
  };

  return baseRequest(config);
};

export default request;
