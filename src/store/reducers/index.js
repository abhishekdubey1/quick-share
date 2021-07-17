import { combineReducers } from "redux";
import toastsReducer from "./toastReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  toasts: toastsReducer
});

export default rootReducer;
