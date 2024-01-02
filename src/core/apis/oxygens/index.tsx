import {createQueryKeys} from '@lukemorales/query-key-factory';
import {plantiesUrl} from '../../http/url';
import request from '../../http/request';
import {useQuery} from '@tanstack/react-query';

const oxygens = () => request(plantiesUrl('oxygens'));
export const oxygenKeys = createQueryKeys('oxygen', {
  oxygens: () => ({
    queryKey: ['oxygens'],
    queryFn: oxygens,
  }),
});

export const useOxygens = () =>
  useQuery({
    ...oxygenKeys.oxygens(),
  });
