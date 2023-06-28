import { useAppClient } from '@/http/useAppClient';
import {
  CREATE_POST,
  GET_LIST_POST,
  GET_ALL_LIST_POST,
  GET_DETAIL_POST,
} from '@/constant/apiConstant';
import { QueryKey } from '@/constant/appConstant';
import { ICardPost, IGetPostRequest, IGetPostResponse } from '@/type/post';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
export const useGetAllListPostQuery = () => {
  const { http } = useAppClient();
  return useQuery(
    [QueryKey.get_all_list_post],
    async () => {
      const rs = await http.getMethod<undefined, IGetPostResponse[]>(
        GET_ALL_LIST_POST
      );
      return rs.data;
    },
    {
      staleTime: Infinity,
      onSuccess: (data) => {},
      onError: (error: any) => {
        toast.error(error.message);
      },
    }
  );
};
export const useGetListPostQuery = () => {
  const { http } = useAppClient();
  return useQuery(
    [QueryKey.get_list_post],
    async () => {
      const rs = await http.getMethod<undefined, IGetPostResponse[]>(
        GET_LIST_POST
      );
      return rs.data;
    },
    {
      staleTime: Infinity,
      onSuccess: (data) => {},
      onError: (error: any) => {
        toast.error(error.message);
      },
    }
  );
};
export const useCreatePostMutation = () => {
  const { http } = useAppClient();
  return useMutation(
    async (req: FormData) => {
      const res = await http.postMethod<FormData, null>(CREATE_POST, req, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res;
    },
    {
      onSuccess: () => {
        toast.success('Create post successfully!');
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    }
  );
};
export const useGetDetailPost = (postId: string | undefined) => {
  const { http } = useAppClient();
  return useQuery(
    [QueryKey.get_detail_post, postId],
    async () => {
      const rs = await http.getMethod<undefined, IGetPostResponse>(
        `${GET_DETAIL_POST}/${postId}`
      );
      return rs.data;
    },
    {
      enabled: true,
      onSuccess: (data) => {},
      onError: (error: any) => {
        toast.error(error.message);
      },
    }
  );
};
