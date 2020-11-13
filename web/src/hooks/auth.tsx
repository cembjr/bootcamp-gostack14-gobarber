import React, { createContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: Object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: Object;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const tokenKey = '@GoBarber:token';
const userKey = '@GoBarber:user';

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = React.useState<AuthState>(() => {
    const token = localStorage.getItem(tokenKey);
    const user = localStorage.getItem(userKey);

    if (user && token) return { token, user: JSON.parse(user) };
    return {} as AuthState;
  });

  const signIn = React.useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem(tokenKey, token);
    localStorage.setItem(userKey, JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = React.useCallback(async () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
    setData({} as AuthState);
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
