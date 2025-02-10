import useAxiosInstance from '@/hooks/api/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Bag } from '@/types/types';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export default function useGetBag({
  selectedBag,
  enabled,
}: {
  selectedBag: string;
  enabled: boolean;
}) {
  const api = useAxiosInstance();

  async function getBag(selectedBag: string): Promise<Bag | undefined> {
    try {
      const res = await api.get(`/api/bag/${selectedBag}`);
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
    queryKey: ['bag', selectedBag],
    queryFn: () => getBag(selectedBag),
    enabled: enabled,
  });
}
