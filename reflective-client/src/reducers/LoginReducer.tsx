// 액션 타입 지정
const ActionType = {
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
};

// 초기값 설정
const initialState = {
  email: "",
  password: "",
};

type Action =
  | { type: typeof ActionType.SET_EMAIL; payload: string }
  | { type: typeof ActionType.SET_PASSWORD; payload: string };

const LoginReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_EMAIL:
      return { ...state, email: action.payload };
    case ActionType.SET_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
export { LoginReducer, initialState, ActionType };
