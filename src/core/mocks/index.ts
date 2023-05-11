import {createServer} from 'miragejs';
import {models} from './models';
import {factories} from './factories';
import routes from './routes';
import seeds from './seeds';

// if (window.server) {
//   window.server.shutdown();
// }

// createServer({
//   environment: 'development',
//   models,
//   factories,
//   seeds(server) {
//     seeds(server);
//   },
//   routes() {
//     routes(this);
//   },
// });
