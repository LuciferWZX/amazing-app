import { storage } from "@/lib/storage";
import { StorageKeyEnum } from "@/types/storage";
import axios, { CreateAxiosDefaults } from "axios";
import { match } from "ts-pattern";
const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://api.example.com/api";
function createRequest(
  baseURL: string,
  config: Omit<CreateAxiosDefaults, "baseURL">
) {
  return axios.create({
    baseURL: baseURL,
    ...config,
  });
}
const request = createRequest(API_URL, {
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
request.interceptors.request.use(
  async (config) => {
    const token = await storage.getItem(StorageKeyEnum.TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { status, data } = error.response;
    match(status)
      .with(401, () => {
        console.warn("认证失败 401");
      })
      .with(403, () => {
        console.warn("无权限 403");
      })
      .with(404, () => {
        console.warn("未找到 404");
      })
      .with(500, () => {
        console.warn("服务器错误 500");
      })
      .with(502, () => {
        console.warn("网关错误 502");
      })
      .with(503, () => {
        console.warn("服务不可用 503");
      })
      .with(504, () => {
        console.warn("网关超时 504");
      })
      .with(505, () => {
        console.warn("HTTP版本不支持 505");
      })
      .with(506, () => {
        console.warn("变种协商 506");
      })
      .otherwise(() => {
        console.warn("服务器错误", data);
      });
    if (error.request) {
      console.warn("网络错误，请检查网络连接");
    } else {
      console.warn("请求错误", error.message);
    }
    return Promise.reject(error);
  }
);

export default request;
