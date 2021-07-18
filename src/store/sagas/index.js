import { all } from "redux-saga/effects";
import watchUserSagas from "./userSagas";

export default function* rootSaga() {
	yield all([watchUserSagas()]);
}
