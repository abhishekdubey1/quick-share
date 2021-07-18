import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { apiEndPoint } from "../../utils/helper";
import { makeToasts } from "../actions/toastActions";
import { SET_POSTS, SET_POSTS_SAGA, SET_POST_STATUS } from "../types";
export const headers = {
  Authorization: "Bearer " + localStorage.getItem("jwt")
};
const getPostsApiCall = async () => {
  return await axios(`${apiEndPoint}/post`, { headers: { ...headers } });
};

function* setPostsSaga({ payload }) {
  try {
    yield put({ type: SET_POST_STATUS, payload: { status: "loading" } });
    const {
      data: { posts }
    } = yield call(getPostsApiCall, payload.user);
    yield put({ type: SET_POST_STATUS, payload: { status: "success" } });
    yield put(makeToasts("info", "Welcome"));
    yield put({ type: SET_POSTS, payload: { posts } });
  } catch (error) {
    console.log({ error });
    yield put(
      makeToasts(
        "error",
        error?.response?.data?.error || error.message || "Fail to load posts"
      )
    );
    yield put({
      type: SET_POST_STATUS,
      payload: {
        status: "fail"
      }
    });
    // error: error?.response?.data?.error || error.message
  }
}
function* likePostSaga({ payload }) {
  try {
    yield put({ type: SET_POST_STATUS, payload: { status: "loading" } });
    const {
      data: { posts }
    } = yield call(getPostsApiCall, payload.user);
    yield put({ type: SET_POST_STATUS, payload: { status: "success" } });
    yield put(makeToasts("info", "Welcome"));
    yield put({ type: SET_POSTS, payload: { posts } });
  } catch (error) {
    console.log({ error });
    yield put(
      makeToasts(
        "error",
        error?.response?.data?.error || error.message || "Fail to load posts"
      )
    );
    yield put({
      type: SET_POST_STATUS,
      payload: {
        status: "fail"
      }
    });
    // error: error?.response?.data?.error || error.message
  }
}

export default function* watchPostsSagas() {
  yield takeEvery(SET_POSTS_SAGA, setPostsSaga);
  // yield takeEvery(SIGNUP_USER_SAGA, signupUser);
}
