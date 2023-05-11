import {Server} from 'miragejs';
import registerProductRoutes from './plants';
import registerAuthRoutes from './auth';

const routes = (context: Server) => {
  registerAuthRoutes(context);
  registerProductRoutes(context);
};

export default routes;
