import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useRef } from "react";

export const useRefreshOnFocus = () => {
  const queryClient = useQueryClient();
  const firstTimeRef = useRef(true);
  useFocusEffect(() => {
    console.warn("useRefreshOnFocus");

    if (firstTimeRef.current) {
      firstTimeRef.current = false;
      return;
    }
    queryClient.refetchQueries({
      queryKey: ["user-info"],
      stale: true,
      type: "active",
    });
  });
};
