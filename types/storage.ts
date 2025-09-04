export enum StorageKeyEnum {
  TOKEN = "token",
  DEVICE_ID = "device_id",
}

export type StorageKey = keyof typeof StorageKeyEnum | string;
