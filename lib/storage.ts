import { StorageKey } from "@/types/storage";
import * as SecureStore from "expo-secure-store";

export const storage = {
  async setItem(key: StorageKey, value: string) {
    await SecureStore.setItemAsync(key, value);
  },
  async getItem(key: StorageKey) {
    return await SecureStore.getItemAsync(key);
  },
  async removeItem(key: StorageKey) {
    await SecureStore.deleteItemAsync(key);
  },
};
