import React, {useState} from 'react';
import {Auth, AuthContext} from './Auth.context';
import {useProfile} from '../../../core/apis/auth';
import {useSessionStorage} from '../../../core/storage';

export interface ThemeProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<ThemeProviderProps> = props => {
  const {children} = props;
  const [token, setToken] = useSessionStorage();
  const [user, setUser] = useState<Auth['user'] | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useProfile({
    enabled: Boolean(token) && !user,
    onSuccess(res) {
      if (res.data.data.user) {
        setUser(res.data.data.user);
      }
    },
    onError() {
      setToken(undefined);
      setUser(null);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        refreshToken,
        setRefreshToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
