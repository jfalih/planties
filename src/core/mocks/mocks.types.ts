import {Registry} from 'miragejs';
import Schema from 'miragejs/orm/schema';

import {models} from './models';
import {factories} from './factories';

export type AppRegistry = Registry<typeof models, typeof factories>;
export type AppSchema = Schema<AppRegistry>;
