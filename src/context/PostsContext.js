import { createContext, useReducer } from "react";

export const PostContext = createContext();
export const initialContextState = [];

const userReducer = (state = initialContextState, { type, payload }) => {
  switch (type) {
    case "SET":
      return payload;
    case "CLEAR":
      return [];
    case "LIKE":
      return;
    case "UNLIKE":
      return;
    default:
      return state;
  }
};
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialContextState);
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
}
