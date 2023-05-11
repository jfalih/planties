import {faker} from '@faker-js/faker';
import {Factory} from 'miragejs';
import {FactoryDefinition, WithFactoryMethods} from 'miragejs/-types';
import {UserType} from '../models/UserModel';

const UserFactory: FactoryDefinition<WithFactoryMethods<UserType>> =
  Factory.extend({
    id(n) {
      return n + 1;
    },
    name() {
      return faker.name.fullName();
    },
    email() {
      return faker.internet.email('planties');
    },
    token() {
      return null;
    },
    password() {
      return faker.helpers.arrayElement(['12345678', 'planties', 'oxygen123']); // 'dog'
    },
    plants() {
      return null;
    },
  });

export default UserFactory;
