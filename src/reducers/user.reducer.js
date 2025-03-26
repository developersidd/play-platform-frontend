import {
  LOGGED_OUT,
  PROFILE_UPDATED,
  SET_USER,
  TOKEN_REFRESHED,
} from "@/actions/user.action";

export const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    case LOGGED_OUT:
      return {};
    case PROFILE_UPDATED: {
      return { ...state, ...action.payload };
    }
    case TOKEN_REFRESHED:
      return { ...state, tokens: { ...action.payload } };
    default:
      return state;
  }
};
