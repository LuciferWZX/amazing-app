import { NetworkResponse } from "@/types/response";
import request from "./request";

export const getCurrentUser = async () => {
  const response = await request<NetworkResponse<string>>("/user/current");

  return response;
};
