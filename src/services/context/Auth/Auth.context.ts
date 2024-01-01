import {createContext, useContext} from 'react';

export interface Auth {
  token?: string;
  refreshToken: string | null;
  user: {
    name: string;
    profile_image: string | null;
    gardenCount: number;
    plantCount: number;
    oxygen: number;
  } | null;
  setUser: (user: Auth['user'] | null) => void;
  setToken: (token?: string) => void;
  setRefreshToken: (refreshToken: string | null) => void;
}

export const AuthContext = createContext<Auth>({
  refreshToken: null,
  user: null,
  setToken: () => {},
  setUser: () => {},
  setRefreshToken: () => {},
});

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error(
      'useAuth should be used inside the children of the AuthProvider.',
    );
  }

  return auth;
};
