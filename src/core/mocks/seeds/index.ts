import {Server} from 'miragejs';
import user from './user';

const seeds = (context: Server) => {
  user(context);
};

export default seeds;
