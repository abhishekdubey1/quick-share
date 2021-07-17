import { all } from "redux-saga/effects";
import watchUserSagas from "./countSagas";

export default function* rootSaga() {
  yield all([watchUserSagas()]);
}
