import { createContext, useReducer } from "react";

export const UserContext = createContext();
const initialState = null;

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER":
      return payload;
    case "CLEAR":
      return null;
    case "UPDATE":
      return {
        ...state,
        followers: payload.followers,
        following: payload.following,
      };
    case "UPDATEPIC":
      return {
        ...state,
        pic: payload,
      };
    default:
      return state;
  }
};
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
