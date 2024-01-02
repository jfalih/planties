import {useMutation, useQuery} from '@tanstack/react-query';
import request from '../../http/request';
import {plantiesUrl} from '../../http/url';
import {createQueryKeys} from '@lukemorales/query-key-factory';
import {PlantBody} from './plants.types';

export const detail = (gardenId: number) =>
  request(plantiesUrl(`gardens/${gardenId}/plants`));

export const plants = (gardenId: number) =>
  request(plantiesUrl(`gardens/${gardenId}/plants`));

export const list = () => request(plantiesUrl('plants'));
export const plantsKeys = createQueryKeys('plants', {
  plantDetail: (gardenId: number) => ({
    queryKey: [gardenId],
    queryFn: () => detail(gardenId),
  }),
  list: params => ({
    queryKey: [{...params}],
    queryFn: () => plants(params),
  }),
  plants: () => ({
    queryKey: ['list'],
    queryFn: list,
  }),
});

export const addPlant = (gardenId: number, data: PlantBody) =>
  request(plantiesUrl(`gardens/${gardenId}/plants`), {
    method: 'post',
    data,
  });

export const useAddPlant = (id: string) =>
  useMutation((body: PlantBody) => addPlant(id, body));

export const usePlants = params =>
  useQuery({
    ...plantsKeys.list(params),
  });

export const usePlantList = () =>
  useQuery({
    ...plantsKeys.plants(),
  });
export const usePlantsByGarden = (gardenId: number) =>
  useQuery({
    ...plantsKeys.plantDetail(gardenId),
    enabled: !!gardenId,
  });
