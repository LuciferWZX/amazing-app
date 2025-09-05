import { getCurrentUser } from "@/services/user";
import useAppStore from "@/stores/useAppStore";
import { ResponseCodeEnum } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
const useInitApp = () => {
  const { isFetching, isLoading, error } = useQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      const data = await getCurrentUser();
      if (data.code === ResponseCodeEnum.SUCCESS) {
        useAppStore.setState({ user: data.data });
      } else {
      }

      return data;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { isFetching, isLoading };
};

export default useInitApp;
