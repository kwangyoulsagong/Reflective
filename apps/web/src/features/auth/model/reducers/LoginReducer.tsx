export interface LoginState {
  email: string;
  password: string;
  errors: {
    email: string;
    password: string;
  };
}

// 액션 타입 지정
export const enum ActionType {
  SET_EMAIL = "SET_EMAIL",
  SET_PASSWORD = "SET_PASSWORD",
  SET_ERRORS = "SET_ERRORS",
}

// 초기값 설정
export const initialState = {
  email: "",
  password: "",
  errors: {
    email: "",
    password: "",
  },
};

type Action =
  | { type: ActionType.SET_EMAIL; payload: string }
  | { type: ActionType.SET_PASSWORD; payload: string }
  | { type: ActionType.SET_ERRORS; payload: LoginState["errors"] };

export const LoginReducer = (state: LoginState, action: Action): LoginState => {
  switch (action.type) {
    case ActionType.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
        errors: { ...state.errors, email: "" },
      };
    case ActionType.SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
        errors: { ...state.errors, password: "" },
      };
    case ActionType.SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
