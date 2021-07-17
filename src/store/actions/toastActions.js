import { CLEAR_TOAST, SET_TOAST } from "../types";

export const clearToasts = () => ({
  type: CLEAR_TOAST,
  payload: {}
});

export const makeToasts = (status, message) => ({
  type: SET_TOAST,
  payload: { status, message }
});
