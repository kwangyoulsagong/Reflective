import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postRouterState } from "../../../types/types";

export const usePostRouterStore = create<postRouterState>()(
  persist(
    (set) => ({
      nickname: "",
      title: "",
      setNickname: (nickname: string) => set({ nickname }),
      setTitle: (title: string) => set({ title }),
    }),
    {
      name: "postRouter-storage",
      getStorage: () => localStorage,
    }
  )
);
