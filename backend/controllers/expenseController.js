import Expense from "../models/expenseModel.js";
import asyncHandler from "express-async-handler";

/**
   @desc Create a new Expense
   @route POST /api/expenses
   @access public
   */

export const createExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, incurred_on, notes, shared_by } = req.body;

  const expense = new Expense({
    title,
    amount,
    category,
    incurred_on,
    notes,
    recorded_by: req.user._id,
    shared_by,
    // shared_by: [req.user._id],
    // 5fee48239d16fa2da0f34d4a
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
  const expenses = await Expense.find({ recorded_by: req.user._id })
    .sort("incurred_on")
    .populate("recorded_by", "_id name");

  res.status(201).json(expenses);
});

export const getExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    res.json(expense);
  } else {
    res.status(404);
    throw new Error("Expense not found");
  }
});

export const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (expense) {
    expense.title = req.body.title || expense.title;
    expense.amount = req.body.amount || expense.amount;
    expense.category = req.body.category || expense.category;
    expense.incurred_on = req.body.incurred_on || expense.incurred_on;
    expense.notes = req.body.notes || expense.notes;
    expense.shared_by = req.body.shared_by || expense.shared_by;
   
    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
