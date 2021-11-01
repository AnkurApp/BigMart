import {
  GET_USERPRODUCT_FAILURE,
  GET_USERPRODUCT_SUCCESS,
  GET_SELLPRODUCT_FAILURE,
  GET_SELLPRODUCT_SUCCESS,
  GET_CART_ITEMS,
  GET_FAV_ITEMS,
  GET_ORDER_ITEMS,
  GET_CATEGORYDATA,
} from "../Actions/actionNames";

const initialState = {
  products: [],
  sellProducts: [],
  categoryData: [],
  cart: [],
  favorite: [],
  orders: [],
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

    case GET_CATEGORYDATA: {
      state = {
        ...state,
        categoryData: [...action.payLoad],
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

    case GET_CART_ITEMS: {
      state = {
        ...state,
        cart: action.payLoad,
      };
      break;
    }

    case GET_FAV_ITEMS: {
      state = {
        ...state,
        favorite: action.payLoad,
      };
      break;
    }

    case GET_ORDER_ITEMS: {
      state = {
        ...state,
        orders: action.payLoad,
      };
      break;
    }

    default: {
      state = { ...state };
    }
  }
  return state;
}
