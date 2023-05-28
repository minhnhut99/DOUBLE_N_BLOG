import { GET_ALL_CATEGORY } from "@/constant/apiConstant";
import { QueryKey } from "@/constant/appConstant";
import { useAppClient } from "@/http/useAppClient";
import { useQuery } from "react-query";

export const useGetAllCategoryQuery = () => {
  const { http } = useAppClient();
  return useQuery(
    QueryKey.get_all_catetory,
    async () => {
      const rs = await http.getMethod(GET_ALL_CATEGORY);
      return rs;
    },
    {
      onSuccess: () => {},
      onError: (error: any) => {},
    }
  );
};
