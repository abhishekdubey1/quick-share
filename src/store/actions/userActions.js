import { LOGIN_USER_SAGA, LOGOUT_USER, SIGNUP_USER_SAGA } from "../types";
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
  localStorage.setItem("jwt", null);
  localStorage.setItem("user", JSON.stringify({}));
  return {
    type: LOGOUT_USER,
    payload: {}
  };
};
