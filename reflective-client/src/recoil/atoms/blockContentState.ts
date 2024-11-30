import { atom } from "recoil";
// 블록 콘텐츠 상태관리
export const blockContentState = atom({
  key: "blockContentState",
  default: new Map(),
});
