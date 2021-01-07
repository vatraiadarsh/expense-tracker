import express from "express";
const router = express.Router();

import { protect, Admin } from "../middleware/authMiddleware.js";

import {
  createExpense,
  listAllExpense,
  listExpenseByUser

} from "../controllers/expenseController.js";

router.route("/").post(protect, createExpense).get(protect, listAllExpense);
router.route("/my").post(protect, createExpense).get(protect, listExpenseByUser);


export default router;


