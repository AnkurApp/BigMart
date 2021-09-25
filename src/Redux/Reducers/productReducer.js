import {
  GET_USERPRODUCT_FAILURE,
  GET_USERPRODUCT_SUCCESS,
  GET_SELLPRODUCT_FAILURE,
  GET_SELLPRODUCT_SUCCESS,
} from "../Actions/actionNames";

const initialState = {
  products: [],
  sellProducts: [],
  error: "",
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERPRODUCT_SUCCESS: {
      state = {
        ...state,
        products: [...action.payLoad],
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

    case GET_SELLPRODUCT_SUCCESS: {
      state = {
        ...state,
        sellProducts: [...action.payLoad],
      };
      break;
    }

    case GET_SELLPRODUCT_FAILURE: {
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
