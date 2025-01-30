import axios from 'axios';
import { useAuth } from '@/hooks/auth/useAuth';

const useAxiosInstance = () => {
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

      if (error.response?.status === 401 && !originalRequest._retry) {
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
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
};

export default useAxiosInstance;
