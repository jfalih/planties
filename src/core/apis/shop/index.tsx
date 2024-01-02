import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useQuery} from '@tanstack/react-query';
import request from '../../http/request';
import {plantiesUrl} from '../../http/url';

const shopDetail = (id: string) => request(plantiesUrl(`markets/items/${id}`));

export const shopKeys = createQueryKeys('shop', {
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => shopDetail(id),
  }),
});

export const useShopDetail = (id: string) => {
  return useQuery({
    ...shopKeys.detail(id),
    enabled: !!id,
  });
};
