export enum ResponseCodeEnum {
  SUCCESS = 0,
  ERROR = 500,
}
export type NetworkResponse<T> = {
  code: ResponseCodeEnum | number;
  message: string;
  data: T;
};
