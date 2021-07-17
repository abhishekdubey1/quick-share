import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { apiEndPoint } from "../../utils/helper";
import { makeToasts } from "../actions/toastActions";
import { LOGIN_USER, LOGIN_USER_SAGA, LOGOUT_USER } from "../types";
function resolveAfterFewSec(delay) {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, delay);
  });
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function* loginUser({ payload }) {
  const {
    data: { user, token }
  } = yield axios.post(`${apiEndPoint}/signin`, {
    password: payload.user.password,
    email: payload.user.email
  });
  localStorage.setItem("jwt", token);
  localStorage.setItem("user", JSON.stringify(user));
  yield put(makeToasts("info", "Logged In"));
  yield payload.history.push("/");
  yield put({ type: LOGIN_USER, payload: { user } });
}
function* logoutUser({ payload }) {
  yield localStorage.clear();
  yield payload.history.push("/signin");
  yield put(makeToasts("info", "Logged Out"));
  yield put({ type: LOGOUT_USER, payload: {} });
}

export default function* watchUserSagas() {
  yield takeEvery(LOGIN_USER_SAGA, loginUser);
  yield takeEvery(LOGIN_USER_SAGA, logoutUser);
}
