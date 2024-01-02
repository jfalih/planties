import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useMutation, useQuery} from '@tanstack/react-query';
import request from '../../http/request';
import {plantiesUrl} from '../../http/url';
import {CartParams} from './cart.types';

const cart = (data: CartParams) =>
  request(plantiesUrl('marketplace/carts'), {
    method: 'post',
    data,
  });

export const cartKeys = createQueryKeys('carts', {
  list: () => ({
    queryKey: ['cart'],
    queryFn: cart,
  }),
});

export const useAddCart = () => useMutation(cart);
export const useCart = () => {
  return useQuery({
    ...cartKeys.list(),
  });
};
