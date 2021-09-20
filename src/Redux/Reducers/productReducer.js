import {
  GET_USERPRODUCT_FAILURE,
  GET_USERPRODUCT_SUCCESS,
} from "../Actions/actionNames";

const initialState = {
  products: null,
  error: "",
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERPRODUCT_SUCCESS: {
      console.log(action.payLoad, "ap");
      state = {
        ...state,
        products: action.payLoad,
      };
      break;
    }

    case GET_USERPRODUCT_FAILURE: {
      state = {
        ...state,
        error: action.payLoad.error,
      };
      break;
    }

    default: {
      state = { ...state };
    }
  }
  return state;
}
