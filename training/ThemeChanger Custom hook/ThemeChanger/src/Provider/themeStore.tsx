import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
interface themeState{
    theme:string,
    setTheme:(theme:string)=>void
}

export const useThemeStore = create<themeState>(
    persist(
      (set) => ({
        theme: "bg-gray-100",
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: "theme-storage", // 로컬 스토리지에 저장될 키 이름
      }
    )
  );
