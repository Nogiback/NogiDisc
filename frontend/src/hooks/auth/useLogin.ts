import { useState } from 'react';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { LoginFormData } from '@/types/types';
import { useAuth } from '@/context/useAuth';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';

export default function useLogin() {
  const api = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser, setAccessToken } = useAuth();

  async function login(formData: LoginFormData) {
    const isValid = handleInputErrors(formData);
    if (!isValid) return;
    setIsLoading(true);

    try {
      const res = await api.post('/api/auth/login', formData);
      if (res.status === 200) {
        toast.success('User successfully logged in.');
      }
      setAuthUser(res.data);
      setAccessToken(res.data.accessToken);
      api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        toast.error('Incorrect username or password.');
        return;
      }
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, login };
}

function handleInputErrors({ email, password }: LoginFormData) {
  if (!email || !password) {
    toast.error('Please fill out all fields.');
    return false;
  } else {
    return true;
  }
}