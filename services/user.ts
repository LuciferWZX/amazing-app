import { NetworkResponse } from "@/types/response";
import { AppUser } from "@/types/user";
import request from "./request";

export const getCurrentUser = async () => {
  const response = await request<NetworkResponse<AppUser>>({
    url: "/user/info",
    method: "GET",
  });
  return response;
};
