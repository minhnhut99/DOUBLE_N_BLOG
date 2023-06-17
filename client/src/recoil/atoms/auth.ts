import { atom } from 'recoil';
import { getCookie } from '@/utils/utils';
import { IUserLoginResponse } from '@/type/auth';

export const auth = atom<IUserLoginResponse>({
  key: 'auth',
  default: {
    token: getCookie('token'),
    user: getCookie('user'),
  },
});
