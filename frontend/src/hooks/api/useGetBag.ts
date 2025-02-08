import useAxiosInstance from '@/hooks/api/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Bag } from '@/types/types';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export default function useGetBags(bagID: string) {
  const api = useAxiosInstance();

  async function getBag(bagID: string): Promise<Bag | undefined> {
    try {
      const res = await api.get(`/api/bag/${bagID}`);
      return res.data;
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

  return useQuery({
    queryKey: ['bag', bagID],
    queryFn: () => getBag(bagID),
  });
}
