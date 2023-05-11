import {Server} from 'miragejs';
import getUserPlants from './get-user-plants';

const registerProductRoutes = (context: Server) => {
  return [context.get('https://planties.com/user/plants', getUserPlants)];
};

export default registerProductRoutes;
