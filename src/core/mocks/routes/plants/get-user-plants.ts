import response from '../../../utils/response';
import { Request } from 'miragejs';
import { AppSchema } from '../../mocks.types';

const getUserPlants = (schema: AppSchema, request: Request) => {
  const plant = schema.db.plants;
  return response(200, 'Successfully get notifications!', plant);
};

export default getUserPlants;
