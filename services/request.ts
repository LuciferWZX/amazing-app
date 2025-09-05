import { storage } from "@/lib/storage";
import { StorageKeyEnum } from "@/types/storage";
import axios, { CreateAxiosDefaults } from "axios";
import Toast from "react-native-toast-message";
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
const _request = createRequest(API_URL, {
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
_request.interceptors.request.use(
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
_request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 处理timeout错误
    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      console.warn("请求超时，请检查网络连接或稍后重试");
      return Promise.reject(new Error("请求超时"));
    }

    // 处理网络错误（没有响应的情况）
    if (!error.response) {
      if (error.request) {
        console.warn("网络错误，请检查网络连接");
        Toast.show({
          type: "error",
          text1: "网络错误，请检查网络连接",
          text2: "网络连接失败",
        });
        return Promise.reject(new Error("网络连接失败"));
      } else {
        console.warn("请求配置错误", error.message);
        return Promise.reject(error);
      }
    }

    // 处理HTTP状态码错误
    const { status, data } = error.response;
    const textMap = {
      401: "认证失败 401",
      403: "无权限 403",
      404: "未找到 404",
      500: "服务器错误 500",
      502: "网关错误 502",
      503: "服务不可用 503",
      504: "网关超时 504",
      505: "HTTP版本不支持 505",
      506: "变种协商 506",
    };
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
    console.warn("textMap", textMap);

    Toast.show({
      type: "error",
      text1: status.toString(),
      text2: textMap[status as keyof typeof textMap] || "服务器错误",
    });
    return Promise.reject(error);
  }
);

// 定义请求配置类型
interface RequestConfig {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  params?: any;
  headers?: any;
}

// 创建带类型的 request 函数
const request = async <T>(config: RequestConfig): Promise<T> => {
  return _request(config);
};

export default request;
