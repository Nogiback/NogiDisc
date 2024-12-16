import { createContext, useState, useEffect } from 'react';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';
import { AuthContextType, AuthUser, AuthProviderProp } from '@/types/types';
import axios from 'axios';

const defaultContextValue: AuthContextType = {
  authUser: null,
  setAuthUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
  isLoading: true,
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

export function AuthProvider({ children }: AuthProviderProp) {
  const api = useAxiosInstance();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.post('/api/auth/refresh', null, {
          withCredentials: true,
        });
        setAccessToken(res.data.accessToken);

        if (res.data.accessToken) {
          const user = await api.get('/api/auth/verify', {
            headers: { Authorization: `Bearer ${res.data.accessToken}` },
          });
          setAuthUser(user.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 401 ||
            error.response?.status === 204
          ) {
            console.warn('User is not authenticated. Redirecting to login.');
            setAccessToken(null);
            setAuthUser(null);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, authUser, setAuthUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
