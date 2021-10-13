import { LOGIN_USER, LOGOUT_USER } from "../types";

const INITIAL_STATE = {
  email: null,
  name: null,
  _id: null,
  dpUrl: null,
  followers: null,
  following: null,
  postsCount: null
};
export default function userReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case LOGIN_USER: {
      return { ...state, ...payload.user };
    }
    case LOGOUT_USER: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}
