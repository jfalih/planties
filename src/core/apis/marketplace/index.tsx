import {createQueryKeys} from '@lukemorales/query-key-factory';
import request from '../../http/request';
import {plantiesUrl} from '../../http/url';
import {MarketplaceParams} from './marketplace.types';
import {useQuery} from '@tanstack/react-query';

const marketplace = (paramsQuery: MarketplaceParams) => {
  return request(plantiesUrl('marketplace/items', paramsQuery));
};

export const marketplaceKeys = createQueryKeys('items', {
  list: (params: MarketplaceParams) => ({
    queryKey: [{...params}],
    queryFn: () => marketplace(params),
  }),
});

export const useItems = (params: MarketplaceParams) => {
  return useQuery({
    ...marketplaceKeys.list(params),
  });
};
