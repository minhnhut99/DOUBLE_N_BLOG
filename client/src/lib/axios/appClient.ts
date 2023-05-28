/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
const appClient = axios.create({});

appClient.interceptors.request.use(
  async (config: any) => {
    const newConfig = { ...config };
    newConfig.headers = {
      ...config.headers,
      'access-control-allow-origin': '*',
      'Content-Type': 'application/json',
    };
    return newConfig;
  },
  function (error) {
    return Promise.reject(error);
  }
);

appClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default appClient;
