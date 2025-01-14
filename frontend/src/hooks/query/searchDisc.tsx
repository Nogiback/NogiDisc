import { SearchResponse } from '@/types/types';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

export async function searchDisc(query: string) {
  try {
    const res = await axios.get<SearchResponse>(
      `https://discit-api.fly.dev/disc?name=${query}`,
    );
    return res;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 401) {
      return;
    }
    if (err instanceof AxiosError) {
      toast.error(err.message);
    }
  }
}
