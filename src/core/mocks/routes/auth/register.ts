import response from '../../../utils/response';
import {Request} from 'miragejs';
import {AppSchema} from '../../mocks.types';
import {sha256} from 'react-native-sha256';

const register = async (schema: AppSchema, request: Request) => {
  const {name, email, password, c_password} = JSON.parse(request.requestBody);

  if (!name || !email || !password || !c_password) {
    return response(400, 'Ada form yang masih kosong!', []);
  } else {
    let token = await sha256(`${email},${password}`);

    let user = schema.db.users.insert({
      name,
      email,
      password,
      token,
    });

    if (user) {
      return response(200, 'Successfully get notifications!', user);
    }
    return response(400, 'Successfully get notifications!', []);
  }
};

export default register;
