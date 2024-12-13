// import axios from 'axios';

// // In-memory access token
// let accessToken: string | null = null;

// const api = axios.create({
//   baseURL: 'http://localhost:3000',
//   withCredentials: true,
// });

// // Request Interceptor
// api.interceptors.request.use(
//   (config) => {
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // Response Interceptor for 401 errors
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Call the refresh endpoint to get a new access token
//         const { data } = await axios.post(
//           '/api/auth/refresh',
//           {},
//           { withCredentials: true },
//         );
//         accessToken = data.accessToken;

//         // Retry the original request with the new token
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//         return api(originalRequest);
//       } catch (err) {
//         console.error('Token refresh failed:', err);
//         // Redirect to login or notify user of session expiration
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;

import axios from 'axios';
import { useAuth } from '@/context/useAuth';

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
