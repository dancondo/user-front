import { createReducer } from "reduxsauce";
import {
  LoginUserAction,
  UserTypes,
} from "./users.actions";

export interface UserState {
  data: UserDto;
}

export const INITIAL_STATE: UserState = {
  data: {} as UserDto,
};

export const loginUser = (
  state = INITIAL_STATE,
  action: LoginUserAction
): UserState => {
  return {
    ...state,
    data: action.user,
  };
};

export const logoutUser = (state = INITIAL_STATE): UserState => {
  return {
    ...state,
    data: {} as UserDto,
  };
};

export const HANDLERS = {
  [UserTypes.LOGIN_USER]: loginUser,
  [UserTypes.LOGOUT_USER]: logoutUser,
};

export default createReducer(INITIAL_STATE, HANDLERS);
