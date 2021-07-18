import { LOGIN_USER_SAGA, LOGOUT_USER_SAGA, SIGNUP_USER_SAGA } from "../types";
export const login = user => {
  return {
    type: LOGIN_USER_SAGA,
    payload: { user }
  };
};
export const signup = user => {
  return {
    type: SIGNUP_USER_SAGA,
    payload: { user }
  };
};
export const logout = () => {
  return {
    type: LOGOUT_USER_SAGA,
    payload: {}
  };
};
