import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useAuth } from '@/context/useAuth';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';
import { useLoginContext } from '@/context/useLoginContext';

export default function useGoogleAuth() {
  const api = useAxiosInstance();
  const { setAuthUser, setAccessToken } = useAuth();
  const { setIsSubmitting } = useLoginContext();

  async function googleLogin(code: string) {
    setIsSubmitting(true);

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
      setIsSubmitting(false);
    }
  }

  async function googleSignup(code: string) {
    setIsSubmitting(true);

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
      setIsSubmitting(false);
    }
  }

  return { googleLogin, googleSignup };
}
