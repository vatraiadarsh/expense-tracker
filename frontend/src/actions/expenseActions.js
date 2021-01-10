import axios from "axios";
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
import { USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../constants/userConstants";

export const createExpense = (
  title,
  amount,
  category,
  incurred_on,
  shared_by,
  notes
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPENSE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/expenses`,
      {
        title,
        amount,
        category,
        incurred_on,
        shared_by,
        notes,
      },
      config
    );

    dispatch({
      type: EXPENSE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXPENSE_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAllExpense = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_LIST_ALL_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/expenses`, config);

    dispatch({
      type: EXPENSE_LIST_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXPENSE_LIST_ALL_FAILURE,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const listByUserExpense = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_LIST_BY_USER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/expenses/my`, config);

    dispatch({
      type: EXPENSE_LIST_BY_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXPENSE_LIST_BY_USER_FAILURE,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
