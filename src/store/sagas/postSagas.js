import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { apiEndPoint } from "../../utils/helper";
import { makeToasts } from "../actions/toastActions";
import {
  SET_POSTS,
  SET_POSTS_SAGA,
  SET_POST_STATUS,
  LIKE_POST_SAGA,
  UNLIKE_POST_SAGA,
  LIKE_POST,
  SET_LIKE_STATUS
} from "../types";

const fetchPosts = () => {
  return axios(`${apiEndPoint}/post`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt")
    }
  });
};

const likePost = id => {
  return axios.put(
    `${apiEndPoint}/post/like/`,
    { id },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    }
  );
};

const unlikePost = id => {
  return axios.put(
    `${apiEndPoint}/post/unlike`,
    { id },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    }
  );
};

function* setPostsSaga({ payload }) {
  try {
    yield put({ type: SET_POST_STATUS, payload: { status: "loading" } });
    const {
      data: { posts }
    } = yield call(fetchPosts);
    yield put({ type: SET_POST_STATUS, payload: { status: "success" } });
    yield put({ type: SET_POSTS, payload: { posts } });
  } catch (error) {
    console.log({ error });
    yield put(
      makeToasts(
        "error",
        error?.response?.data?.error || error.message || "Failed to load posts"
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

function* LikePostSaga({ payload }) {
  try {
    yield put({ type: SET_LIKE_STATUS, payload: { status: "loading" } });
    const {
      data: { post }
    } = yield call(likePost, payload.id);
    yield put({ type: SET_LIKE_STATUS, payload: { status: "idle" } });
    yield put({ type: LIKE_POST, payload: { post } });
  } catch (error) {
    console.log({ error });
    yield put({
      type: SET_LIKE_STATUS,
      payload: { status: "error", error }
    });
    yield put(
      makeToasts(
        "error",
        error?.response?.data?.error || error.message || "Failed to like post"
      )
    );
  }
}

function* UnlikePostSaga({ payload }) {
  try {
    yield put({ type: SET_LIKE_STATUS, payload: { status: "loading" } });
    const {
      data: { post }
    } = yield call(unlikePost, payload.id);
    yield put({ type: SET_LIKE_STATUS, payload: { status: "idle" } });
    yield put({ type: LIKE_POST, payload: { post } });
  } catch (error) {
    console.log({ error });
    yield put({
      type: SET_LIKE_STATUS,
      payload: { status: "error", error }
    });
    yield put(
      makeToasts(
        "error",
        error?.response?.data?.error || error.message || "Failed to unlike post"
      )
    );
  }
}

export default function* watchPostSagas() {
  yield takeEvery(SET_POSTS_SAGA, setPostsSaga);
  yield takeEvery(LIKE_POST_SAGA, LikePostSaga);
  yield takeEvery(UNLIKE_POST_SAGA, UnlikePostSaga);
}
