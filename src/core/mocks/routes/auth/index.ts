import {Server} from 'miragejs';
import url, {baseUrl} from '../../../http/url';
import login from './login';
import register from './register';

const registerAuthRoutes = (context: Server) => {
  return [
    context.post(url(baseUrl, 'auth/login'), login),
    context.post(url(baseUrl, 'auth/register'), register),
  ];
};

export default registerAuthRoutes;
