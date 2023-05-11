import { faker } from '@faker-js/faker';
import { Factory } from 'miragejs';
import { FactoryDefinition } from 'miragejs/-types';
import { PlantType } from '../models/PlantModel';

const PlantFactory: FactoryDefinition<PlantType> = Factory.extend({
  id(n) {
    return n + 1;
  },
  name() {
    return faker.commerce.product();
  },
  status() {
    return faker.helpers.arrayElement(['ok', 'good', 'danger']); // 'dog'
  },
  image() {
    return faker.image.imageUrl(400, 600, 'plant', true);
  },
});

export default PlantFactory;
