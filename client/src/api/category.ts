import { GET_ALL_CATEGORY } from '@/constant/apiConstant';
import { QueryKey } from '@/constant/appConstant';
import { useAppClient } from '@/http/useAppClient';
import { ICategories } from '@/type/post';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
export const useGetAllCategoryQuery = () => {
  const { http } = useAppClient();
  return useQuery(
    [QueryKey.get_all_category],
    async () => {
      const rs = await http.getMethod<undefined, ICategories[]>(
        GET_ALL_CATEGORY
      );
      return rs.data;
    },
    {
      onSuccess: (data) => {},
      onError: (error: any) => {
        toast.error(error.message);
      },
    }
  );
};
