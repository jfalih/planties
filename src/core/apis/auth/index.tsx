import request from '../../http/request';
import {UseQueryOptions, useMutation, useQuery} from '@tanstack/react-query';
import {plantiesUrl} from '../../http/url';
import {
  AuthError,
  LoginBody,
  LoginSuccess,
  RegisterBody,
  RegisterSuccess,
} from './auth.types';
import {createQueryKeys} from '@lukemorales/query-key-factory';

export const login = (data: LoginBody) =>
  request(plantiesUrl('authentications'), {
    method: 'post',
    data,
  });

export const register = (data: LoginBody) =>
  request(plantiesUrl('users'), {
    method: 'post',
    data,
  });

export const profile = () => request(plantiesUrl('users'));

export const profileKeys = createQueryKeys('profile', {
  profile: {
    queryKey: ['profile'],
    queryFn: profile,
  },
});

export const useProfile = (options: UseQueryOptions<any>) =>
  useQuery({
    ...profileKeys.profile,
    ...options,
  });
export const useRegister = () =>
  useMutation<RegisterSuccess, AuthError, RegisterBody, unknown>(register);

export const useLogin = () =>
  useMutation<LoginSuccess, AuthError, LoginBody, unknown>(login);
