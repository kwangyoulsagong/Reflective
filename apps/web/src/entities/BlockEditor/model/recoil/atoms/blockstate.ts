import { atom } from "recoil";

const blockState = atom({
  key: "blackState",
  default: null, // 초기값
});
export default blockState;
