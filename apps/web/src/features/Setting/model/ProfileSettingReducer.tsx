export interface ProfileState {
  image_url: string;
  email: string;
  nickname: string;
  phone_number: string;
}
export enum ActionType {
  SET_IMAGEURL = "SET_IMAGEURL",
  SET_EMAIL = "SET_EMAIL",
  SET_NICKNAME = "SET_NICKNAME",
  SET_PHONE_NUMBER = "SET_PHONE_NUMBER",
}
type Action =
  | { type: ActionType.SET_IMAGEURL; payload: string }
  | { type: ActionType.SET_EMAIL; payload: string }
  | { type: ActionType.SET_NICKNAME; payload: string }
  | { type: ActionType.SET_PHONE_NUMBER; payload: string };

export const initialState: ProfileState = {
  image_url: "",
  email: "",
  nickname: "",
  phone_number: "",
};

export const ProfileReducer = (
  state: ProfileState,
  action: Action
): ProfileState => {
  switch (action.type) {
    case ActionType.SET_IMAGEURL:
      return {
        ...state,
        image_url: action.payload,
      };
    case ActionType.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case ActionType.SET_NICKNAME:
      return {
        ...state,
        nickname: action.payload,
      };
    case ActionType.SET_PHONE_NUMBER:
      return {
        ...state,
        phone_number: action.payload,
      };
    default:
      return state;
  }
};
