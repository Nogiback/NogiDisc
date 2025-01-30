import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { SignupFormData } from '@/types/types';
import { useAuth } from '@/hooks/auth/useAuth';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';
import { useLoginContext } from '@/hooks/auth/useLoginContext';

export default function useSignup() {
  const api = useAxiosInstance();
  const { setAuthUser, setAccessToken } = useAuth();
  const { setIsSubmitting } = useLoginContext();

  async function signup(formData: SignupFormData) {
    const isValid = handleInputErrors(formData);
    if (!isValid) return;
    setIsSubmitting(true);

    try {
      const res = await api.post('/api/auth/signup', formData);
      if (res.status === 200) {
        toast.success('User successfully signed up.');
      }
      setAuthUser(res.data);
      setAccessToken(res.data.accessToken);
      api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        toast.error(err.response.data.message);
        return;
      }
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return { signup };
}

function handleInputErrors({
  email,
  firstName,
  lastName,
  password,
  confirmPassword,
}: SignupFormData) {
  if (!email || !password || !firstName || !lastName || !confirmPassword) {
    toast.error('Please fill out all fields.');
    return false;
  } else {
    return true;
  }
}
