import { all } from "redux-saga/effects";
import watchPostsSagas from "./postSagas";
import watchUserSagas from "./userSagas";

export default function* rootSaga() {
  yield all([watchUserSagas(), watchPostsSagas()]);
}
