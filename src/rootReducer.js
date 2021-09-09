import { combineReducers } from "redux";

import authReducer from "./Redux/Reducers/authReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
});
