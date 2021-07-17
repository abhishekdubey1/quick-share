import { LOGIN_USER, LOGOUT_USER } from "../types";

const INITIAL_STATE = {
  email: null,
  name: null,
  _id: null,
  dpUrl: null,
  followersCount: null,
  followingCount: null,
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
// a = {
//   dpUrl:
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs7kc4LWYMTgCvPRNPCDK99Vf0O1vggwWsgA&usqp=CAU",
//   followers: ["609ea882b038f400292b9ee0", "6093bb0528bce2002328eed9"],
//   following: ["609ea882b038f400292b9ee0"],
//   _id: "6093b5b628bce2002328eed8",
//   name: "abhishek",
//   email: "abhishek@gmail.com",
//   __v: 0,
//   postsCount: 2
// };
