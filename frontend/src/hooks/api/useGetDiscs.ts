import useAxiosInstance from '@/hooks/api/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/useAuth';
import { Disc } from '@/types/types';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export default function useGetDiscs() {
  const api = useAxiosInstance();
  const { authUser } = useAuth();

  async function getDiscs(): Promise<Disc[] | undefined> {
    try {
      const res = await api.get(`/api/user/${authUser?.id}/inventory`);
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
    queryKey: ['discs'],
    queryFn: getDiscs,
  });
}
