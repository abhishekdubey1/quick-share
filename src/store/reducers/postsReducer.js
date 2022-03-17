import {
  SET_POSTS,
  CREATE_POST,
  DELETE_POST,
  SET_FOLLOWINGS_POSTS,
  LIKE_POST
} from "../types";
import { produce } from "immer";
const INITIAL_STATE = [];
export default function postsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SET_POSTS: {
      return payload.posts;
    }
    case SET_FOLLOWINGS_POSTS: {
      return payload.posts;
    }
    case CREATE_POST: {
      return produce(state, draft => {
        draft.unshift(payload.post);
      });
    }
    case DELETE_POST: {
      return produce(state, draft => {
        draft.splice(payload.postIndex, 1);
      });
    }
    case LIKE_POST: {
      const idx = state.findIndex(post => post._id === payload.post._id);
      return produce(state, draft => {
        draft[idx].likes = payload.post.likes;
      });
    }
    // case ADD_COMMENT: {
    //   return produce(state, draft => {
    //     draft[payload.postIndex].comments.push(payload.comment);
    //   });
    // }
    // case DELETE_COMMENT: {
    //   return produce(state, draft => {
    //     draft[payload.postIndex].comments.splice(payload.commentIndex);
    //   });
    // }
    default:
      return state;
  }
}
