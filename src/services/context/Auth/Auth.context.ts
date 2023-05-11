import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createContext, useContext} from 'react';

export interface Auth {
  user: FirebaseAuthTypes.User | null;
  handleUser(user: FirebaseAuthTypes.User): void;
}

export const AuthContext = createContext<Auth>({
  user: null,
  handleUser: () => {},
});

export const useAuth = () => useContext(AuthContext);
