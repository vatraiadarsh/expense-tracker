import {
  EXPENSE_CREATE_FAILURE,
  EXPENSE_CREATE_REQUEST,
  EXPENSE_CREATE_SUCCESS,
  EXPENSE_DELETE_FAILURE,
  EXPENSE_DELETE_REQUEST,
  EXPENSE_DELETE_SUCCESS,
  EXPENSE_DETAILS_FAILURE,
  EXPENSE_DETAILS_REQUEST,
  EXPENSE_DETAILS_SUCCESS,
  EXPENSE_LIST_ALL_FAILURE,
  EXPENSE_LIST_ALL_REQUEST,
  EXPENSE_LIST_ALL_SUCCESS,
  EXPENSE_LIST_BY_USER_FAILURE,
  EXPENSE_LIST_BY_USER_REQUEST,
  EXPENSE_LIST_BY_USER_SUCCESS,
  EXPENSE_UPDATE_FAILURE,
  EXPENSE_UPDATE_REQUEST,
  EXPENSE_UPDATE_SUCCESS,
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

export const expenseListAllReducer = (state = { expenses: [] }, action) => {
  switch (action.type) {
    case EXPENSE_LIST_ALL_REQUEST:
      return { loading: true, expenses: [] };

    case EXPENSE_LIST_ALL_SUCCESS:
      return { loading: false, success: true, expenses: action.payload };

    case EXPENSE_LIST_ALL_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const expenseListByUserReducer = (state = { expenses: [] }, action) => {
  switch (action.type) {
    case EXPENSE_LIST_BY_USER_REQUEST:
      return { loading: true, expenses: [] };

    case EXPENSE_LIST_BY_USER_SUCCESS:
      return { loading: false, success: true, expenses: action.payload };

    case EXPENSE_LIST_BY_USER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const expenseDetailsReducer = (state = { expense: {} }, action) => {
  switch (action.type) {
    case EXPENSE_DETAILS_REQUEST:
      return { loading: true, ...state };

    case EXPENSE_DETAILS_SUCCESS:
      return { loading: false, expense: action.payload };

    case EXPENSE_DETAILS_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const expenseUpdateReducer = (state = { expense: {} }, action) => {
  switch (action.type) {
    case EXPENSE_UPDATE_REQUEST:
      return { loading: true };

    case EXPENSE_UPDATE_SUCCESS:
      return { loading: false, success: true, expense: action.payload };

    case EXPENSE_UPDATE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const expenseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_DELETE_REQUEST:
      return { loading: true };

    case EXPENSE_DELETE_SUCCESS:
      return { loading: false, success: true };

    case EXPENSE_DELETE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
