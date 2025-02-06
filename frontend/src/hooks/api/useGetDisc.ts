import useAxiosInstance from '@/hooks/api/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Disc } from '@/types/types';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export default function useGetDisc({ discID }: { discID: string }) {
  const api = useAxiosInstance();

  async function getDisc(discID: string): Promise<Disc | undefined> {
    try {
      const res = await api.get(`/api/inventory/${discID}`);
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
    queryKey: ['disc', discID],
    queryFn: () => getDisc(discID),
  });
}
