import {
  SET_LIKE_STATUS,
  SET_COMMENT_STATUS,
  SET_POSTS_STATUS,
  SET_POST_STATUS,
  SET_PROFILE_STATUS,
  SET_LOGIN_STATUS,
  SET_SIGNUP_STATUS
} from "../types";
import { produce } from "immer";
const initialState = {
  signinLoader: { status: "idle", error: null },
  signupLoader: { status: "idle", error: null },
  likeLoader: { status: "idle", error: null },
  commentLoader: { status: "idle", error: null },
  postsLoader: { status: "idle", error: null },
  postLoader: { status: "idle", error: null },
  profileLoader: { status: "idle", error: null }
};

function toastsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_LOGIN_STATUS: {
      return produce(state, draft => {
        draft.signinLoader.status = payload.status;
        draft.signinLoader.error = payload.error || null;
      });
    }
    case SET_SIGNUP_STATUS: {
      return produce(state, draft => {
        draft.signupLoader.status = payload.status;
        draft.signupLoader.error = payload.error || null;
      });
    }
    case SET_LIKE_STATUS: {
      return produce(state, draft => {
        draft.likeLoader.status = payload.status;
        draft.likeLoader.error = payload.error || null;
      });
    }
    case SET_COMMENT_STATUS: {
      return produce(state, draft => {
        draft.commentLoader.status = payload.status;
        draft.commentLoader.error = payload.error || null;
      });
    }
    case SET_POSTS_STATUS: {
      return produce(state, draft => {
        draft.postsLoader.status = payload.status;
        draft.postsLoader.error = payload.error || null;
      });
    }
    case SET_POST_STATUS: {
      return produce(state, draft => {
        draft.postLoader.status = payload.status;
        draft.postLoader.error = payload.error || null;
      });
    }
    case SET_PROFILE_STATUS: {
      return produce(state, draft => {
        draft.profileLoader.status = payload.status;
        draft.profileLoader.error = payload.error || null;
      });
    }
    default:
      return state;
  }
}

export default toastsReducer;
