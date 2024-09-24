import { LOGGED_OUT, PROFILE_UPDATED, SET_USER } from "@/actions/user.acton";

export const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log(action);
      return { ...state, ...action.payload };
    case LOGGED_OUT:
      return {};
    case PROFILE_UPDATED: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
