import Expense from "../models/expenseModel.js";
import asyncHandler from "express-async-handler";

/**
   @desc Create a new Expense
   @route POST /api/expenses
   @access public
   */

export const createExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, incurred_on, notes } = req.body;

  const expense = new Expense({
    title,
    amount,
    category,
    incurred_on,
    notes,
    recorded_by: req.user._id,
  });
  const createdExpense = await expense.save();
  res.status(201).json(createdExpense);
});
