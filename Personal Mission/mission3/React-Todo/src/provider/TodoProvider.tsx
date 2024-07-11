import { create } from "zustand";

// 인터페이스 정의
interface TitleState{
    title:string,
    setTitle:(title: string)=>void
}

// 상태 관리 함수
export const useTitleStore=create<TitleState>((set)=>({
    title:"",
    setTitle:(title)=>set({title})
}))