import { useState } from 'react';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useAuth } from '@/context/useAuth';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';

export default function useGoogleAuth() {
  const api = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser, setAccessToken } = useAuth();

  async function googleLogin(code: string) {
    setIsLoading(true);

    try {
      const res = await api.post('/api/auth/google', {
        code,
      });
      if (res.status === 200) {
        toast.success('User successfully logged in.');
      }
      setAuthUser(res.data);
      setAccessToken(res.data.accessToken);
      api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        toast.error('Something went wrong. Please try again.');
        return;
      }
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function googleSignup(code: string) {
    setIsLoading(true);

    try {
      const res = await api.post('/api/auth/google', {
        code,
      });
      if (res.status === 200) {
        toast.success('User successfully signed up.');
      }
      setAuthUser(res.data);
      setAccessToken(res.data.accessToken);
      api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        toast.error('Something went wrong. Please try again.');
        return;
      }
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, googleLogin, googleSignup };
}
