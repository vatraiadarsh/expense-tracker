import axios from "axios";
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

import { logout } from "./userActions";

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

export const getExpenseDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/expenses/${id}`, config);

    dispatch({
      type: EXPENSE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXPENSE_DETAILS_FAILURE,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateExpense = (expense) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/expenses/${expense._id}`,
      expense,
      config
    );

    dispatch({
      type: EXPENSE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXPENSE_UPDATE_FAILURE,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteExpense = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPENSE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/expenses/${id}`, config);

    dispatch({
      type: EXPENSE_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: EXPENSE_DELETE_FAILURE,
      payload: message,
    });
  }
};
