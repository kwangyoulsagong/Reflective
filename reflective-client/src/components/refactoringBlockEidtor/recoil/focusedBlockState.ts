import { atom } from "recoil";

// 현재 블록 상태 관리
export const focusedBlockState = atom({
  key: "focusedBlockState",
  default: null,
});
