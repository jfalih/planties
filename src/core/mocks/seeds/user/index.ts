import {Server} from 'miragejs';

const user = (context: Server) => {
  let plant = context.createList('plant', 12);
  context.createList('user', 5, {plant});
};

export default user;
