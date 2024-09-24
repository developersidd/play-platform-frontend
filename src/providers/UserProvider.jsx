"use client";
import { UserContext } from "@/context";
import { initialState, userReducer } from "@/reducers/user.reducer";
import { useReducer } from "react";

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
