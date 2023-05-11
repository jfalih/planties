import {Model, hasMany} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type PlantType = {
  id: number;
  name: string | null;
  status: 'ok' | 'good' | 'danger';
  image: string;
};

export type PlantCategoryType = {
  id: number;
  name: string;
};

export const PlantCategoriesModel: ModelDefinition<PlantCategoryType> =
  Model.extend({
    plant: hasMany(),
  });

export const PlantModel: ModelDefinition<PlantType> = Model.extend({
  user: hasMany(),
  plantCategories: hasMany(),
});
