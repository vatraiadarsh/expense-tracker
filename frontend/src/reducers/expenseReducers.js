import {
  EXPENSE_CREATE_FAILURE,
  EXPENSE_CREATE_REQUEST,
  EXPENSE_CREATE_SUCCESS,
  EXPENSE_LIST_ALL_FAILURE,
  EXPENSE_LIST_ALL_REQUEST,
  EXPENSE_LIST_ALL_SUCCESS,
  EXPENSE_LIST_BY_USER_FAILURE,
  EXPENSE_LIST_BY_USER_REQUEST,
  EXPENSE_LIST_BY_USER_SUCCESS,
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

export const expenseListAllReducer = (state = { expense: [] }, action) => {
  switch (action.type) {
    case EXPENSE_LIST_ALL_REQUEST:
      return { loading: true, expense: [] };

    case EXPENSE_LIST_ALL_SUCCESS:
      return { loading: false, success: true, expense: action.payload };

    case EXPENSE_LIST_ALL_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const expenseListByUserReducer = (
  state = { expense: [],  },
  action
) => {
  switch (action.type) {
    case EXPENSE_LIST_BY_USER_REQUEST:
      return { loading: true, expense: [] };

    case EXPENSE_LIST_BY_USER_SUCCESS:
      return { loading: false, success: true, expense: action.payload };

    case EXPENSE_LIST_BY_USER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
