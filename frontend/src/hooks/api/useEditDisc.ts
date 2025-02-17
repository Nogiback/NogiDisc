import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { EditDiscFormData } from '@/types/types';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';

export default function useEditDisc() {
  const api = useAxiosInstance();

  async function editDisc(formData: EditDiscFormData) {
    const isValid = handleInputErrors(formData);
    if (!isValid) return;

    try {
      const res = await api.patch(
        `/api/inventory/edit/${formData.id}`,
        formData,
      );
      if (res.status === 200) {
        toast.success('Disc successfully updated');
      }
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

  return { editDisc };
}

function handleInputErrors({
  brand,
  name,
  weight,
  category,
  plastic,
  colour,
}: EditDiscFormData) {
  if (!brand || !name || !weight || !category || !plastic || !colour) {
    toast.error('Please fill out all fields.');
    return false;
  } else {
    return true;
  }
}
