import {Model, hasMany} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';
import {PlantType} from './PlantModel';

export type UserType = {
  id: number;
  name: string | null;
  email: string | null;
  password: string;
  token: string | null;
  plants: PlantType[] | null;
};

export const UserModel: ModelDefinition<UserType> = Model.extend({
  plant: hasMany(),
});
