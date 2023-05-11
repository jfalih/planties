import React, {useCallback, useEffect, useState} from 'react';
import {AuthContext} from './Auth.context';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {storage} from '../../../core/utils/storage';

export interface ThemeProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<ThemeProviderProps> = props => {
  const {children} = props;
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const handleUser = useCallback((user: FirebaseAuthTypes.User) => {
    setUser(user);
  }, []);

  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User) => {
      handleUser(user);
    },
    [handleUser],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
