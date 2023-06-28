import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRecoilValue } from 'recoil';
import { auth } from '@/recoil/atoms/auth';
const { token } = useRecoilValue(auth);
// Create a custom Axios configuration
const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_CORE, // API base URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'multipart/form-data', // Example headers
    Authorization: `Bearer ${token}`,
  },
};

// Create an Axios client instance
const apiClient: AxiosInstance = axios.create(axiosConfig);

// Optional: You can add request interceptors to modify requests or handle errors
apiClient.interceptors.request.use(
  (config: any) => {
    // Modify request config, if needed
    config = axiosConfig;
    return config;
  },
  (error: any) => {
    // Handle request error, if needed
    return Promise.reject(error);
  }
);

// Optional: You can add response interceptors to modify responses or handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify response data, if needed
    return response;
  },
  (error: any) => {
    // Handle response error, if needed
    return Promise.reject(error);
  }
);

export default apiClient;
