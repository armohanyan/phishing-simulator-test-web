import axios, { AxiosInstance, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';

const axiosConfig: { headers: { "Content-Type": string }; baseURL: string } = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000', // Fallback URL
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig as CreateAxiosDefaults);

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
