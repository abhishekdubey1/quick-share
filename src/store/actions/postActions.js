import { CREATE_POST_SAGA, DELETE_POST_SAGA, SET_POSTS_SAGA } from "../types";

export const setPosts = () => {
  if (localStorage.getItem("jwt") !== null) {
    return {
      type: SET_POSTS_SAGA,
      payload: {}
    };
  }
  return {
    type: "",
    payload: {}
  };
};
export const createPost = () => ({
  type: CREATE_POST_SAGA,
  payload: {}
});
export const deltePost = () => ({
  type: DELETE_POST_SAGA,
  payload: {}
});
