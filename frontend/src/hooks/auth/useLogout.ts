import { useAuth } from '@/hooks/auth/useAuth';
import { useState } from 'react';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';
import { useQueryClient } from '@tanstack/react-query';

export default function useLogout() {
  const api = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuth();
  const queryClient = useQueryClient();

  async function logout() {
    setIsLoading(true);
    try {
      await api.post('/api/auth/logout', {}, { withCredentials: true });
      queryClient.removeQueries();
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
