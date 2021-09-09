import { createStore, applyMiddleware, compose } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";

const logger = createLogger();
const middleWares = compose(applyMiddleware(thunk, logger));

export const store = createStore(rootReducer, middleWares);
