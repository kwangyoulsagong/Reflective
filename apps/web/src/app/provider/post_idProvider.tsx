import { post_idState } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// post_id 저장
export const usePost_idStore = create<post_idState>()(
  persist(
    (set) => ({
      post_id: "",
      setPost_id: (post_id: string) => set({ post_id: post_id }),
    }),
    { name: "post_id-storage", getStorage: () => localStorage }
  )
);
