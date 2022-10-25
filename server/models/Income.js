import mongoose from "mongoose";

const incomeSchema = mongoose.Schema(
  {
    income: { type: String, max: 200, required: true },
    amount: { type: Number, required: true },
    income_date: { type: String, required: true },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
