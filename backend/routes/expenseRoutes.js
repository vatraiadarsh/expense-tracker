import express from "express";
const router = express.Router();

import { protect, Admin } from "../middleware/authMiddleware.js";

import {
  createExpense,
  listAllExpense,
  listExpenseByUser,
  getExpenseById,
  updateExpense,
} from "../controllers/expenseController.js";

router.route("/").post(protect, createExpense).get(protect, listAllExpense);
router
  .route("/my")
  .post(protect, createExpense)
  .get(protect, listExpenseByUser);

router.route("/:id").get(protect, getExpenseById).put(protect, updateExpense);

export default router;
