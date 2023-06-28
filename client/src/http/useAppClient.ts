import { useEffect } from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import appClient from '@/lib/axios/appClient';
import { getApiCore } from './endpoints';
import { auth } from '@/recoil/atoms/auth';
import { useRecoilValue } from 'recoil';

export const useAppClient = () => {
  const { token } = useRecoilValue(auth);
  useEffect(() => {
    appClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [token]);
  const getMethod = <Req, Res>(
    path: string,
    params?: Req,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Res, any>> =>
    appClient.get<Req, AxiosResponse<Res>>(getApiCore(path), {
      params,
      ...config,
    });

  const postMethod = <Req, Res>(
    path: string,
    data: Req,
    config?: AxiosRequestConfig
  ) => appClient.post<Req, AxiosResponse<Res>>(getApiCore(path), data, config);

  const putMethod = <Req, Res>(
    path: string,
    data: Req,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Res, any>> =>
    appClient.put<Req, AxiosResponse<Res>>(getApiCore(path), data, config);

  const deleteMethod = <Req, Res>(
    path: string,
    data: Req
  ): Promise<AxiosResponse<Res, any>> =>
    appClient.delete<Req, AxiosResponse<Res>>(getApiCore(path), { data: data });

  const patchMethod = <Req, Res>(
    path: string,
    data: Req
  ): Promise<AxiosResponse<Res, any>> =>
    appClient.patch<Req, AxiosResponse<Res>>(getApiCore(path), data);

  return {
    http: { getMethod, postMethod, putMethod, patchMethod, deleteMethod },
  };
};
