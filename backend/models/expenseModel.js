import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Title is required",
    },
    amount: {
      type: String,
      min: 0,
      required: "Amount is required",
    },
    category: {
      type: String,
      trim: true,
      required: "Category is required",
    },
    incurred_on: {
      type: String,
      default: Date.now()
    },
    notes: {
      type: String,
      trim: true,
    },
    recorded_by: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
