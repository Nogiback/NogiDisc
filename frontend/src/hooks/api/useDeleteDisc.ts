import { toast } from 'sonner';
import { AxiosError } from 'axios';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';

export default function useDeleteDisc() {
  const api = useAxiosInstance();

  async function deleteDisc(discID: string) {
    try {
      const res = await api.delete(`/api/inventory/delete/${discID}`);
      if (res.status === 200) {
        toast.success('Disc successfully deleted from inventory');
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

  return { deleteDisc };
}
