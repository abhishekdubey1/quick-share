import { LOGIN_USER_SAGA, LOGOUT_USER } from "../types";
export const login = (user) => {
  return {
    type: LOGIN_USER_SAGA,
    payload: { user }
  };
};
export const logout = () => {
  return {
    type: LOGOUT_USER,
    payload: {}
  };
};
