import { all } from "redux-saga/effects";
import watchPostSagas from "./postSagas";
import watchUserSagas from "./userSagas";

export default function* rootSaga() {
  yield all([watchUserSagas(), watchPostSagas()]);
}
