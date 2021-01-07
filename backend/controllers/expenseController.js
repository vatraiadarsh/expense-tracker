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

/**
   @desc List a new By user
   @route GET /api/expenses
   @access public
   */

// export const listExpenseByUser = asyncHandler(async (req, res) => {
//   let firstDay = req.query.firstDay;
//   let lastDay = req.query.lastDay;

//   const expenses = await Expense.find({
//     $and: [
//       { incurred_on: { $gt: firstDay, $lt: lastDay } },
//       { recorded_by: req.user._id },
//     ],
//   })
//     .sort("incurred_on")
//     .populate("recorded_by", "_id name");

//   res.status(201).json(expenses);
// });

export const listAllExpense = asyncHandler(async (req, res) => {
 
  const expenses = await Expense.find({})
    .sort("incurred_on")
    .populate("recorded_by", "_id name");

  res.status(201).json(expenses);
});

export const listExpenseByUser = asyncHandler(async (req, res) => {
 
  const expenses = await Expense.find( { recorded_by: req.user._id })
    .sort("incurred_on")
    .populate("recorded_by", "_id name");

  res.status(201).json(expenses);
});

