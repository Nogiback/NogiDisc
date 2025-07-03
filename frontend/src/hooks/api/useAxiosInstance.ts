import axios from 'axios';
import { useAuth } from '@/hooks/auth/useAuth';
import { toast } from 'sonner';

export default function useAxiosInstance() {
  const { accessToken, setAccessToken } = useAuth();

  const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        error.response?.data?.code === 'TOKEN_EXPIRED' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const res = await axios.post('/api/auth/refresh', null, {
            withCredentials: true,
          });
          setAccessToken(res.data.accessToken);

          // Retry the original request with new token
          originalRequest.headers['Authorization'] =
            `Bearer ${res.data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          toast.error('Session expired. Please log in again.');
          // Optionally, you can redirect to login page or clear user state
          setAccessToken(null);
          return Promise.reject(refreshError);
        }
      }

      // Show toast for other errors (not token expiration)
      if (
        !(
          error.response?.status === 401 &&
          error.response?.data?.code === 'TOKEN_EXPIRED'
        )
      ) {
        toast.error(error.response?.data?.message || 'An error occurred');
      }

      return Promise.reject(error);
    },
  );

  return api;
}
