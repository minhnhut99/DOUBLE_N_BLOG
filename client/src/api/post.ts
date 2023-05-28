import { CREATE_POST } from "@/constant/apiConstant";
import { useAppClient } from "@/http/useAppClient";
import { useMutation } from "@tanstack/react-query";

export const useCreatePostMutation = () => {
  const { http } = useAppClient();
  return useMutation(async (req: FormData) => {
    const res = await http.postMethod<FormData, null>(CREATE_POST, req, {
      headers: { "Content-type": "multipart/form-data" },
    });
    return res;
  });
};
