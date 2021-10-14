import {
  CREATE_POST_SAGA,
  DELETE_POST_SAGA,
  LIKE_POST_SAGA,
  SET_POSTS_SAGA,
  UNLIKE_POST_SAGA
} from "../types";

export const setPosts = () => ({
  type: SET_POSTS_SAGA,
  payload: {}
});
export const createPost = () => ({
  type: CREATE_POST_SAGA,
  payload: {}
});
export const deltePost = () => ({
  type: DELETE_POST_SAGA,
  payload: {}
});
export const likePost = id => ({
  type: LIKE_POST_SAGA,
  payload: { id }
});
export const unLikePost = id => ({
  type: UNLIKE_POST_SAGA,
  payload: { id }
});
