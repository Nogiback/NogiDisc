import { useState } from 'react';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { AddDiscFormData } from '@/types/types';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';

export default function useAddDisc() {
  const api = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(false);

  async function addDisc(formData: AddDiscFormData) {
    const isValid = handleInputErrors(formData);
    if (!isValid) return;
    setIsLoading(true);

    try {
      const res = await api.post('/api/inventory/create', formData);
      if (res.status === 200) {
        toast.success('Disc successfully added to inventory');
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        toast.error(err.response.data.message);
        return;
      }
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { addDisc, isLoading };
}

function handleInputErrors({
  brand,
  name,
  weight,
  category,
  plastic,
  colour,
}: AddDiscFormData) {
  if (!brand || !name || !weight || !category || !plastic || !colour) {
    toast.error('Please fill out all fields.');
    return false;
  } else {
    return true;
  }
}
