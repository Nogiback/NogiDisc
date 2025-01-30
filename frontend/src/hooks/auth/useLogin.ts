import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { LoginFormData } from '@/types/types';
import { useAuth } from '@/hooks/auth/useAuth';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';
import { useLoginContext } from '@/hooks/auth/useLoginContext';

export default function useLogin() {
  const api = useAxiosInstance();
  const { setAuthUser, setAccessToken } = useAuth();
  const { setIsSubmitting } = useLoginContext();

  async function login(formData: LoginFormData) {
    const isValid = handleInputErrors(formData);
    if (!isValid) return;
    setIsSubmitting(true);

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
      setIsSubmitting(false);
    }
  }

  return { login };
}

function handleInputErrors({ email, password }: LoginFormData) {
  if (!email || !password) {
    toast.error('Please fill out all fields.');
    return false;
  } else {
    return true;
  }
}
