import { useAuth } from '@/context/useAuth';
import { useState } from 'react';
import useAxiosInstance from '@/api/api';

export default function useLogout() {
  const api = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuth();

  async function logout() {
    setIsLoading(true);
    try {
      await api.post('/api/auth/logout', {}, { withCredentials: true });
      setAuthUser(null);
      delete api.defaults.headers.Authorization;
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, logout };
}
