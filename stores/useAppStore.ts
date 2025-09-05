import { AppUser } from "@/types/user";
import { create } from "zustand";
interface AppStore {
  user: AppUser | null;
}

const useAppStore = create<AppStore>(() => ({
  user: null,
}));

export default useAppStore;
