import { combineReducers } from "redux";

import authReducer from "./Redux/Reducers/authReducer";
import productReducer from "./Redux/Reducers/productReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
});
