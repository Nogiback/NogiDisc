import { useState } from 'react';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { AddBagFormData } from '@/types/types';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';

export default function useAddBag() {
  const api = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(false);

  async function addBag(formData: AddBagFormData) {
    const isValid = handleInputErrors(formData);
    if (!isValid) return;
    setIsLoading(true);

    try {
      const res = await api.post('/api/bag/create', formData);
      if (res.status === 200) {
        toast.success('Bag successfully added');
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

  return { addBag, isLoading };
}

function handleInputErrors({ name }: AddBagFormData) {
  if (!name) {
    toast.error('Please fill out all fields.');
    return false;
  } else {
    return true;
  }
}
