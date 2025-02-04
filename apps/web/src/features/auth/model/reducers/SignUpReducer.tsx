export interface SignUpState {
  email: string;
  password: string;
  nickname: string;
  phone_number: string;
  errors: {
    email: string;
    password: string;
    nickname: string;
    phone_number: string;
  };
}

export enum ActionType {
  SET_EMAIL = "SET_EMAIL",
  SET_PASSWORD = "SET_PASSWORD",
  SET_NICKNAME = "SET_NICKNAME",
  SET_PHONE_NUMBER = "SET_PHONE_NUMBER",
  SET_ERRORS = "SET_ERRORS",
}

type Action =
  | { type: ActionType.SET_EMAIL; payload: string }
  | { type: ActionType.SET_PASSWORD; payload: string }
  | { type: ActionType.SET_NICKNAME; payload: string }
  | { type: ActionType.SET_PHONE_NUMBER; payload: string }
  | { type: ActionType.SET_ERRORS; payload: SignUpState["errors"] };

export const initialState: SignUpState = {
  email: "",
  password: "",
  nickname: "",
  phone_number: "",
  errors: {
    email: "",
    password: "",
    nickname: "",
    phone_number: "",
  },
};

export const SignUpReducer = (
  state: SignUpState,
  action: Action
): SignUpState => {
  switch (action.type) {
    case ActionType.SET_EMAIL:
      return { ...state, email: action.payload };
    case ActionType.SET_PASSWORD:
      return { ...state, password: action.payload };
    case ActionType.SET_NICKNAME:
      return { ...state, nickname: action.payload };
    case ActionType.SET_PHONE_NUMBER:
      return { ...state, phone_number: action.payload };
    case ActionType.SET_ERRORS:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
