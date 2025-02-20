import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { ProfileFormData } from '@/types/types';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';
import { useAuth } from '../auth/useAuth';

export default function useEditProfile() {
  const api = useAxiosInstance();
  const { authUser, setAuthUser } = useAuth();

  async function editProfile(formData: ProfileFormData) {
    const isValid = handleInputErrors(formData);
    if (!isValid) return;

    try {
      const res = await api.patch(`/api/user/${authUser?.id}/update`, formData);
      if (res.status === 200) {
        toast.success('Profile successfully updated');
      }
      setAuthUser(res.data);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        toast.error(err.response.data.message);
        return;
      }
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    }
  }

  return { editProfile };
}

function handleInputErrors({ email, firstName, lastName }: ProfileFormData) {
  if (!email || !firstName || !lastName) {
    toast.error('Please fill out all fields.');
    return false;
  } else {
    return true;
  }
}
