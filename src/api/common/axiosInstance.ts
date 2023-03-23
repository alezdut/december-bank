/* eslint-disable no-param-reassign */
import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAppDispatch } from '../../redux/hooks';
import { endSession } from '../../redux/slices/sessionSlice';

const baseUrl = process.env.REACT_APP_BASE_URL;

const dispatchAction = () => {
  const dispatch = useAppDispatch();
  dispatch(endSession());
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken');

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      dispatchAction();
    }
  },
);

export default axiosInstance;
