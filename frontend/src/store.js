import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import { userRegisterReducer, userLoginReducer } from "./reducers/userReducers";
import { expenseCreateReducer,expenseListAllReducer,expenseListByUserReducer } from "./reducers/expenseReducers";

const userInfoFromStorege = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const intialState = {
  userLogin: { userInfo: userInfoFromStorege },
};

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  expenseCreate: expenseCreateReducer,
  expenseListAll:expenseListAllReducer,
  expenseListByUser:expenseListByUserReducer,
});

const middleware = [thunk, logger];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
