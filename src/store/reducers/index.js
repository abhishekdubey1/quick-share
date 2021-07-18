import { combineReducers } from "redux";
import toastsReducer from "./toastReducer";
import userReducer from "./userReducer";
import loaderReducer from "./loaderReducer";

const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  toasts: toastsReducer
});

export default rootReducer;
