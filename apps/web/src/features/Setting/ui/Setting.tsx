import { CircleImage } from "../../../shared/CircleImage/CircleImage";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useReducer } from "react";
import {
  ActionType,
  initialState,
  ProfileReducer,
} from "../model/ProfileSettingReducer";
const Setting = () => {
  const [state, dispatch] = useReducer(ProfileReducer, initialState);
  const handleProfileUpdate = () => {
    const body = {
      image_url: state.image_url,
      email: state.email,
      nickname: state.nickname,
      phone_number: state.phone_number,
    };
  };
  return (
    <article className="flex flex-col justify-center items-center w-[400px] h-[600px] border border-gray-300 gap-10">
      <CircleImage />
      <Input
        value={state.email}
        placeholder="이메일"
        onChange={(e) =>
          dispatch({
            type: ActionType.SET_EMAIL,
            payload: e.target.value,
          })
        }
        className="mt-5"
      />
      <Input
        value={state.nickname}
        placeholder="닉네임"
        onChange={(e) =>
          dispatch({
            type: ActionType.SET_NICKNAME,
            payload: e.target.value,
          })
        }
      />
      <Input
        value={state.phone_number}
        placeholder="전화번호"
        onChange={(e) =>
          dispatch({
            type: ActionType.SET_PHONE_NUMBER,
            payload: e.target.value,
          })
        }
      />
      <Button variant="auth" onClick={handleProfileUpdate}>
        프로필 수정
      </Button>
    </article>
  );
};
export default Setting;
