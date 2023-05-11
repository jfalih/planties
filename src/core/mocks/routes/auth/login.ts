import response from '../../../utils/response';
import {Request} from 'miragejs';
import {AppSchema} from '../../mocks.types';
import {sha256} from 'react-native-sha256';

const login = async (schema: AppSchema, request: Request) => {
  const {email, password} = JSON.parse(request.requestBody);

  if (!email || !password) {
    return response(400, 'Failed get users!', []);
  } else {
    let user = schema.findBy('user', {
      email,
      password,
    });
    if (user) {
      let token = await sha256(`${email},${password}`);
      user.update('token', token);
      return response(200, 'Successfully get notifications!', user);
    }

    return response(400, 'Successfully get notifications!', []);
  }
};

export default login;
