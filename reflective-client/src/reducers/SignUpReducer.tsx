// 액션 타입 지정
const ActionType = {
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
  SET_NICKNAME: "SET_NICKNAME",
  SET_PHONE_NUMBER: "SET_PHONE_NUMBER",
};

// 초기값 설정
const initialState = {
  email: "",
  password: "",
  nickname: "",
  phone_number: "",
};

type Action =
  | { type: typeof ActionType.SET_EMAIL; payload: string }
  | { type: typeof ActionType.SET_PASSWORD; payload: string }
  | { type: typeof ActionType.SET_NICKNAME; payload: string }
  | { type: typeof ActionType.SET_PHONE_NUMBER; payload: string };

const SignUpReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_EMAIL:
      return { ...state, email: action.payload };
    case ActionType.SET_PASSWORD:
      return { ...state, password: action.payload };
    case ActionType.SET_NICKNAME:
      return { ...state, nickname: action.payload };
    case ActionType.SET_PHONE_NUMBER:
      return { ...state, phone_number: action.payload };
    default:
      return state;
  }
};
export { SignUpReducer, initialState, ActionType };
