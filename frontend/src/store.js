import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userRegisterReducer,
  userLoginReducer,
  usersListReducer,
  userStatusUpdateReducer,
  userDetailsReducer,
  userProfileUpdateReducer,
} from "./reducers/userReducers";
import {
  expenseCreateReducer,
  expenseListAllReducer,
  expenseListByUserReducer,
  expenseDetailsReducer,
  expenseUpdateReducer,
  expenseDeleteReducer,
} from "./reducers/expenseReducers";

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
  expenseListAll: expenseListAllReducer,
  expenseListByUser: expenseListByUserReducer,
  usersList: usersListReducer,
  userStatusUpdate: userStatusUpdateReducer,
  userDetails:userDetailsReducer,
  userProfileUpdate:userProfileUpdateReducer,
  expenseDetails:expenseDetailsReducer,
  expenseUpdate:expenseUpdateReducer,
  expenseDelete:expenseDeleteReducer
});

const middleware = [thunk, logger];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
