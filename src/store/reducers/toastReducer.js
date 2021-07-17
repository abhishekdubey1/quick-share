import { SET_TOAST, CLEAR_TOAST } from "../types";

const initialState = {
  message: "",
  status: ""
};

function toastsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_TOAST:
      return {
        ...state,
        message: payload.message,
        status: payload.status
      };
    case CLEAR_TOAST:
      return {
        ...state,
        message: "",
        status: ""
      };
    default:
      return state;
  }
}

export default toastsReducer;
