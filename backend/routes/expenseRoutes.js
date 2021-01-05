import express from "express";
const router = express.Router();

import {protect,Admin} from "../middleware/authMiddleware.js";

import { createExpense } from "../controllers/expenseController.js";

router.route("/").post(protect,createExpense);

export default router;
