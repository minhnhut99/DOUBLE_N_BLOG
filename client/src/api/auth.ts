import { AUTH_LOGIN, AUTH_REGISTER } from '@/constant/apiConstant';
import { useAppClient } from '@/http/useAppClient';
import { auth } from '@/recoil/atoms/auth';
import {
  IUserLoginRequest,
  IUserLoginResponse,
  IUserRegisterRequest,
} from '@/type/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

export const useLoginMutation = () => {
  const [authValue, setAuthValue] = useRecoilState(auth);
  const { http } = useAppClient();
  return useMutation(
    async (req: IUserLoginRequest) => {
      const res = await http.postMethod<IUserLoginRequest, IUserLoginResponse>(
        AUTH_LOGIN,
        req
      );
      return res;
    },
    {
      onSuccess: async ({ data }: AxiosResponse<IUserLoginResponse>) => {
        const token = data?.token;
        const user = data?.user;
        setAuthValue({
          token,
          user,
        });
        document.cookie = `token=${token}`;
        document.cookie = `user=${JSON.stringify(user)}`;
        toast.success('Login successfully!');
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    }
  );
};

export const useRegisterMutation = () => {
  const { http } = useAppClient();
  const navigate = useNavigate();
  return useMutation(
    async (req: IUserRegisterRequest) => {
      const res = await http.postMethod<IUserLoginRequest, any>(
        AUTH_REGISTER,
        req
      );
      return res;
    },
    {
      onSuccess: async ({ data }: AxiosResponse<IUserLoginResponse>) => {
        toast.success('Register successfully!');
        navigate('/login');
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    }
  );
};
