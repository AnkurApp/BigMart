import {
  GET_USERDATA,
  UPDATE_NUMBER,
  UPDATE_CITY,
  USER_DP,
  USER_EDIT,
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
  phoneNo: "",
  photoURL: "",
  city: "",
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
      break;
    }

    case GET_USERDATA: {
      state = {
        ...state,
        ...action.payLoad.userData,
      };
      break;
    }

    case USER_LOGOUT_SUCCESS: {
      state = {
        ...state,
        authenticated: "",
      };
      break;
    }

    case USER_EDIT: {
      state = {
        ...state,
        ...action.payLoad.userDetails,
      };
      break;
    }

    case USER_DP: {
      state = {
        ...state,
        photoURL: action.payLoad.url,
      };
      break;
    }

    case UPDATE_NUMBER: {
      state = {
        ...state,
        phoneNo: action.payLoad.number,
      };
      break;
    }
    case UPDATE_CITY: {
      state = {
        ...state,
        city: action.payLoad.city,
      };
      break;
    }

    default:
      state = { ...state };
  }
  return state;
}
