import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_SESSION,
} from "../Actions/actionNames";

const initialState = {
  name: "",
  email: "",
  uid: "",
  authenticated: "",
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      state = {
        ...state,
        ...action.payLoad.user,
        authenticated: "SUCCESS",
      };
      break;
    }

    case USER_LOGIN_FAILURE: {
      state = {
        ...state,
        error: action.payLoad.error,
        authenticated: "FAILED",
      };
      break;
    }

    case USER_SESSION: {
      state = {
        ...state,
        ...action.payLoad.user,
      };
    }

    case USER_LOGOUT_SUCCESS: {
      state = {
        ...state,
        authenticated: "",
      };
    }

    default:
      state = { ...state };
  }
  return state;
}
