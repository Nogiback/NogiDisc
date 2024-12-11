import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContextType, AuthUser, AuthProviderProp } from '@/types/types';

const defaultContextValue: AuthContextType = {
  authUser: null,
  loading: true,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

const AuthProvider = ({ children }: AuthProviderProp) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const { data } = await axios.get('/api/auth/verify', {
          withCredentials: true, // To include cookies
        });
        setAuthUser(data.user); // Backend should return user info
      } catch (error) {
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUserStatus();
  }, []);

  const login = (userData: AuthUser) => {
    setAuthUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setAuthUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
