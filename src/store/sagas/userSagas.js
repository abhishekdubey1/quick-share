import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { apiEndPoint } from "../../utils/helper";
import { makeToasts } from "../actions/toastActions";
import {
  LOGIN_USER,
  LOGIN_USER_SAGA,
  SET_LOGIN_STATUS,
  SET_SIGNUP_STATUS,
  SIGNUP_USER_SAGA
} from "../types";

const loginApiCall = async user => {
  return await axios.put(`${apiEndPoint}/auth`, user);
};
const signupApiCall = async user => {
  return await axios.post(`${apiEndPoint}/auth`, user);
};
function setToLocalStorage(token, user) {
  localStorage.setItem("jwt", token);
  localStorage.setItem("user", JSON.stringify(user));
}
function* loginUser({ payload }) {
  try {
    yield put({ type: SET_LOGIN_STATUS, payload: { status: "loading" } });
    const {
      data: { user, token }
    } = yield call(loginApiCall, payload.user);
    yield setToLocalStorage(token, user);
    yield put({ type: SET_LOGIN_STATUS, payload: { status: "success" } });
    yield put(makeToasts("info", "Logged In"));
    yield put({ type: LOGIN_USER, payload: { user } });
  } catch (error) {
    console.log({ error });
    yield put(
      makeToasts("error", error?.response?.data?.error || error.message)
    );
    yield put({
      type: SET_LOGIN_STATUS,
      payload: {
        status: "fail"
      }
    });
    // error: error?.response?.data?.error || error.message
  }
}
function* signupUser({ payload }) {
  try {
    yield put({ type: SET_SIGNUP_STATUS, payload: { status: "loading" } });
    const {
      data: { user, token }
    } = yield call(signupApiCall, payload.user);
    yield put(makeToasts("success", "Account created"));
    yield setToLocalStorage(token, user);
    yield put({ type: SET_SIGNUP_STATUS, payload: { status: "success" } });
    yield put(makeToasts("info", "Logged In"));
    yield put({ type: LOGIN_USER, payload: { user } });
  } catch (error) {
    console.log({ error });
    if (error?.response?.data?.message) {
      yield put(makeToasts("error", error?.response?.data?.message));
    }
    yield put(
      makeToasts("error", error?.response?.data?.error || error.message)
    );
    yield put({
      type: SET_SIGNUP_STATUS,
      payload: {
        status: "fail"
      }
    });
    // error: error?.response?.data?.error || error.message
  }
}

export default function* watchUserSagas() {
  yield takeEvery(LOGIN_USER_SAGA, loginUser);
  yield takeEvery(SIGNUP_USER_SAGA, signupUser);
}
