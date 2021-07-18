import { combineReducers } from "redux";
import toastsReducer from "./toastReducer";
import userReducer from "./userReducer";
import loaderReducer from "./loaderReducer";
import postsReducer from "./postsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  toasts: toastsReducer,
  posts: postsReducer
});

export default rootReducer;
