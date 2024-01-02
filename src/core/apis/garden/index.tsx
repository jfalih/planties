import {useMutation, useQuery} from '@tanstack/react-query';
import request from '../../http/request';
import {plantiesUrl} from '../../http/url';
import {GardenBody, GardenError, GardenSuccess} from './garden.types';
import {createQueryKeys} from '@lukemorales/query-key-factory';

export const garden = (data: GardenBody) =>
  request(plantiesUrl('gardens'), {
    method: 'post',
    data,
  });

export const deleteGarden = id =>
  request(plantiesUrl(`gardens/${id}`), {
    method: 'delete',
  });

export const gardens = () => request(plantiesUrl('gardens'));
export const gardenDetail = (id: string) =>
  request(plantiesUrl(`gardens/${id}`));

export const useGarden = () =>
  useMutation<GardenSuccess, GardenError, GardenBody, unknown>(garden);

export const gardenKeys = createQueryKeys('garden', {
  garden: {
    queryKey: ['garden'],
    queryFn: gardens,
  },
  gardenDetail: (id: number) => ({
    queryKey: [id],
    queryFn: () => gardenDetail(id),
  }),
});

export const useGardenDetail = (id: number) =>
  useQuery({
    ...gardenKeys.gardenDetail(id),
    enabled: Boolean(id),
  });

export const useDeleteGarden = (id: number) =>
  useMutation(() => deleteGarden(id));
export const useGardens = () =>
  useQuery({
    ...gardenKeys.garden,
  });
