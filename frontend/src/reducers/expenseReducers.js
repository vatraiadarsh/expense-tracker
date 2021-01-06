import {
  EXPENSE_CREATE_FAILURE,
  EXPENSE_CREATE_REQUEST,
  EXPENSE_CREATE_SUCCESS,
} from "../constants/expenseConstants";

export const expenseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_CREATE_REQUEST:
      return {
        loading: true,
      };
    case EXPENSE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        expense: action.payload,
      };
    case EXPENSE_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
   
    default:
      return state;
  }
};
