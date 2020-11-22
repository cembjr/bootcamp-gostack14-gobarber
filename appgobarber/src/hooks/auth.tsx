import React, { createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: unknown;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

interface AuthState {
  token: string;
  user: unknown;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const tokenKey = '@GoBarber:token';
const userKey = '@GoBarber:user';

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = React.useState(true);

  const [data, setData] = React.useState<AuthState>({} as AuthState);

  React.useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([tokenKey, userKey]);

      if (user[1] && token[1])
        setData({ token: token[1], user: JSON.parse(user[1]) });

      setLoading(false);
    }

    loadStorageData();
  });

  const signIn = React.useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      [tokenKey, token],
      [userKey, JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = React.useCallback(async () => {
    await AsyncStorage.multiRemove([tokenKey, userKey]);
    setData({} as AuthState);
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{ user: data.user, signIn, signOut, loading }}
      >
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
