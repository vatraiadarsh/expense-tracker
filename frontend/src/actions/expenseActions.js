import axios from "axios";
import {
  EXPENSE_CREATE_FAILURE,
  EXPENSE_CREATE_REQUEST,
  EXPENSE_CREATE_RESET,
  EXPENSE_CREATE_SUCCESS,
} from "../constants/expenseConstants";

export const createExpense = (
  title,
  amount,
  category,
  incurred_on,
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

    const { data } = await axios.post(`/api/expenses`, {
      title,
      amount,
      category,
      incurred_on,
      notes,
    },config);

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
