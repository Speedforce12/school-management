import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {
    expense: { type: String, max: 200, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
